const { Router } = require('express');
const { z } = require('zod');
const { randomUUID } = require('crypto');
const prisma = require('../lib/prisma');
const logger = require('../lib/logger');
const config = require('../config');
const validate = require('../middlewares/validate');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');

const router = Router();
const pendingTimers = new Map();
const requests = new Map();

const catalog = [
  'architecture interview',
  'api design patterns',
  'express middleware',
  'node.js scaling basics',
  'postgres indexing guide',
  'jwt authentication tutorial',
  'rate limiting strategies'
];

const searchSchema = z.object({
  query: z.string().trim().min(1).max(120),
  userId: z.string().trim().min(1).max(120)
});

const requestIdSchema = z.object({
  requestId: z.string().uuid()
});

function runSearch(query) {
  const lowered = query.toLowerCase();
  return catalog.filter((item) => item.includes(lowered));
}

router.post(
  '/search',
  validate(searchSchema),
  asyncHandler(async (req, res) => {
    const { query, userId } = req.body;
    const requestId = randomUUID();
    const now = new Date().toISOString();

    requests.set(requestId, {
      requestId,
      userId,
      query,
      status: 'pending',
      result: null,
      createdAt: now,
      updatedAt: now
    });

    const previous = pendingTimers.get(userId);
    if (previous) {
      clearTimeout(previous.timer);
      const previousRecord = requests.get(previous.requestId);
      if (previousRecord && previousRecord.status === 'pending') {
        previousRecord.status = 'superseded';
        previousRecord.updatedAt = new Date().toISOString();
        requests.set(previous.requestId, previousRecord);
      }
    }

    const timer = setTimeout(async () => {
      try {
        const result = runSearch(query);
        const record = requests.get(requestId);
        if (!record) {
          return;
        }

        record.status = 'completed';
        record.result = result;
        record.updatedAt = new Date().toISOString();
        requests.set(requestId, record);
        pendingTimers.delete(userId);

        await prisma.searchAudit.create({
          data: { userId, query }
        });
      } catch (err) {
        logger.error({ err, requestId }, 'debounced.search_failed');
      }
    }, config.debounceMs);

    pendingTimers.set(userId, { timer, requestId });

    res.status(202).json({
      data: {
        requestId,
        status: 'pending',
        debounceMs: config.debounceMs
      }
    });
  })
);

router.get(
  '/search/:requestId',
  validate(requestIdSchema, 'params'),
  asyncHandler(async (req, res) => {
    const record = requests.get(req.params.requestId);
    if (!record) {
      throw new ApiError(404, 'Request id not found', 'NOT_FOUND');
    }

    res.json({ data: record });
  })
);

module.exports = router;
