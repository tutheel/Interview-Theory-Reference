import { Router } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma.js';
import validate from '../middlewares/validate.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/apiError.js';

const router = Router();

const idParamSchema = z.object({
  id: z.string().uuid()
});

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(120)
});

const updateUserSchema = createUserSchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: 'At least one field is required for update'
});

const userListSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().optional(),
  sortBy: z.enum(['name', 'email', 'createdAt']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
});

const createProductSchema = z.object({
  name: z.string().min(1).max(120),
  description: z.string().max(500).optional(),
  price: z.coerce.number().positive(),
  userId: z.string().uuid().optional()
});

const updateProductSchema = createProductSchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: 'At least one field is required for update'
});

const productListSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().optional(),
  minPrice: z.coerce.number().nonnegative().optional(),
  maxPrice: z.coerce.number().nonnegative().optional(),
  userId: z.string().uuid().optional(),
  sortBy: z.enum(['name', 'price', 'createdAt']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
});

router.get(
  '/users',
  validate(userListSchema, 'query'),
  asyncHandler(async (req, res) => {
    const { page, limit, search, sortBy, sortOrder } = req.query;
    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } }
          ]
        }
      : {};

    const [items, total] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.user.count({ where })
    ]);

    res.json({ data: items, page, limit, total });
  })
);

router.post(
  '/users',
  validate(createUserSchema),
  asyncHandler(async (req, res) => {
    const user = await prisma.user.create({ data: req.body });
    res.status(201).json({ data: user });
  })
);

router.get(
  '/users/:id',
  validate(idParamSchema, 'params'),
  asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });
    if (!user) {
      throw new ApiError(404, 'User not found', 'NOT_FOUND');
    }
    res.json({ data: user });
  })
);

router.put(
  '/users/:id',
  validate(idParamSchema, 'params'),
  validate(updateUserSchema),
  asyncHandler(async (req, res) => {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json({ data: user });
  })
);

router.delete(
  '/users/:id',
  validate(idParamSchema, 'params'),
  asyncHandler(async (req, res) => {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.status(204).send();
  })
);

router.get(
  '/products',
  validate(productListSchema, 'query'),
  asyncHandler(async (req, res) => {
    const { page, limit, search, minPrice, maxPrice, userId, sortBy, sortOrder } = req.query;

    const where = {
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { description: { contains: search, mode: 'insensitive' } }
            ]
          }
        : {}),
      ...(minPrice !== undefined || maxPrice !== undefined
        ? {
            price: {
              ...(minPrice !== undefined ? { gte: minPrice } : {}),
              ...(maxPrice !== undefined ? { lte: maxPrice } : {})
            }
          }
        : {}),
      ...(userId ? { userId } : {})
    };

    const [items, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.product.count({ where })
    ]);

    res.json({ data: items, page, limit, total });
  })
);

router.post(
  '/products',
  validate(createProductSchema),
  asyncHandler(async (req, res) => {
    const product = await prisma.product.create({ data: req.body });
    res.status(201).json({ data: product });
  })
);

router.get(
  '/products/:id',
  validate(idParamSchema, 'params'),
  asyncHandler(async (req, res) => {
    const product = await prisma.product.findUnique({ where: { id: req.params.id } });
    if (!product) {
      throw new ApiError(404, 'Product not found', 'NOT_FOUND');
    }
    res.json({ data: product });
  })
);

router.put(
  '/products/:id',
  validate(idParamSchema, 'params'),
  validate(updateProductSchema),
  asyncHandler(async (req, res) => {
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json({ data: product });
  })
);

router.delete(
  '/products/:id',
  validate(idParamSchema, 'params'),
  asyncHandler(async (req, res) => {
    await prisma.product.delete({ where: { id: req.params.id } });
    res.status(204).send();
  })
);

export default router;
