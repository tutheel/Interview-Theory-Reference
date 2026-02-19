const { Router } = require('express');
const { z } = require('zod');
const path = require('path');
const fs = require('fs');
const { randomUUID } = require('crypto');
const multer = require('multer');
const prisma = require('../lib/prisma');
const config = require('../config');
const validate = require('../middlewares/validate');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');

const router = Router();

const uploadRoot = path.resolve(process.cwd(), config.uploadDir);
if (!fs.existsSync(uploadRoot)) {
  fs.mkdirSync(uploadRoot, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadRoot),
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, Date.now() + '-' + randomUUID() + extension);
  }
});

const uploader = multer({
  storage,
  limits: { fileSize: config.uploadMaxBytes },
  fileFilter: (req, file, cb) => {
    if (!config.uploadAllowedTypes.includes(file.mimetype)) {
      return cb(new ApiError(400, 'Unsupported file type', 'VALIDATION_ERROR'));
    }
    return cb(null, true);
  }
});

const uploadSingle = (req, res, next) => {
  uploader.single('file')(req, res, (err) => {
    if (!err) {
      return next();
    }
    if (err instanceof multer.MulterError) {
      return next(new ApiError(400, err.message, 'VALIDATION_ERROR'));
    }
    return next(err);
  });
};

const listQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10)
});

const idSchema = z.object({
  id: z.string().uuid()
});

router.post(
  '/files',
  uploadSingle,
  asyncHandler(async (req, res) => {
    if (!req.file) {
      throw new ApiError(400, 'file field is required', 'VALIDATION_ERROR');
    }

    const record = await prisma.fileRecord.create({
      data: {
        originalName: req.file.originalname,
        storedName: req.file.filename,
        mimeType: req.file.mimetype,
        size: req.file.size,
        path: req.file.path
      }
    });

    res.status(201).json({ data: record });
  })
);

router.get(
  '/files',
  validate(listQuerySchema, 'query'),
  asyncHandler(async (req, res) => {
    const { page, limit } = req.query;
    const [items, total] = await Promise.all([
      prisma.fileRecord.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.fileRecord.count()
    ]);

    res.json({ data: items, page, limit, total });
  })
);

router.get(
  '/files/:id',
  validate(idSchema, 'params'),
  asyncHandler(async (req, res, next) => {
    const record = await prisma.fileRecord.findUnique({ where: { id: req.params.id } });
    if (!record) {
      throw new ApiError(404, 'File not found', 'NOT_FOUND');
    }
    if (!fs.existsSync(record.path)) {
      throw new ApiError(404, 'File not found on disk', 'NOT_FOUND');
    }

    res.setHeader('Content-Type', record.mimeType);
    res.setHeader('Content-Disposition', 'attachment; filename="' + record.originalName + '"');
    const stream = fs.createReadStream(record.path);
    stream.on('error', next);
    stream.pipe(res);
  })
);

router.delete(
  '/files/:id',
  validate(idSchema, 'params'),
  asyncHandler(async (req, res) => {
    const record = await prisma.fileRecord.findUnique({ where: { id: req.params.id } });
    if (!record) {
      throw new ApiError(404, 'File not found', 'NOT_FOUND');
    }

    await prisma.fileRecord.delete({ where: { id: req.params.id } });
    if (fs.existsSync(record.path)) {
      fs.unlinkSync(record.path);
    }

    res.status(204).send();
  })
);

module.exports = router;
