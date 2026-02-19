const { Router } = require('express');
const { z } = require('zod');
const crypto = require('crypto');
const prisma = require('../lib/prisma');
const config = require('../config');
const logger = require('../lib/logger');
const validate = require('../middlewares/validate');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');

const router = Router();

const eventSchema = z.object({
  eventId: z.string().min(1),
  type: z.string().min(1),
  payload: z.any().optional()
});

const listSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20)
});

function verifySignature(req) {
  const signature = req.header('x-webhook-signature');
  if (!signature) {
    throw new ApiError(401, 'Missing webhook signature', 'UNAUTHORIZED');
  }

  const payloadBuffer = req.rawBody || Buffer.from(JSON.stringify(req.body));
  const expected = crypto.createHmac('sha256', config.webhookSecret).update(payloadBuffer).digest('hex');

  if (signature.length !== expected.length) {
    throw new ApiError(401, 'Invalid webhook signature', 'UNAUTHORIZED');
  }

  const isValid = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  if (!isValid) {
    throw new ApiError(401, 'Invalid webhook signature', 'UNAUTHORIZED');
  }
}

router.post(
  '/webhooks/demo',
  validate(eventSchema),
  asyncHandler(async (req, res) => {
    verifySignature(req);

    const { eventId } = req.body;
    const existing = await prisma.webhookEvent.findUnique({ where: { eventId } });

    if (existing) {
      return res.status(200).json({ status: 'duplicate', eventId });
    }

    await prisma.webhookEvent.create({
      data: {
        eventId,
        payload: req.body
      }
    });

    const processEvent = new Promise((resolve) => {
      setTimeout(resolve, 750);
    }).then(async () => {
      try {
        await prisma.webhookEvent.update({
          where: { eventId },
          data: { processedAt: new Date() }
        });
      } catch (err) {
        logger.error({ err, eventId }, 'webhook.processing_failed');
      }
    });

    processEvent.catch((err) => logger.error({ err, eventId }, 'webhook.background_promise_failed'));

    return res.status(202).json({ status: 'accepted', eventId });
  })
);

router.get(
  '/webhooks/events',
  validate(listSchema, 'query'),
  asyncHandler(async (req, res) => {
    const { page, limit } = req.query;
    const [items, total] = await Promise.all([
      prisma.webhookEvent.findMany({
        orderBy: { receivedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.webhookEvent.count()
    ]);

    res.json({ data: items, page, limit, total });
  })
);

module.exports = router;
