import { Router } from 'express';
import prisma from '../lib/prisma.js';
import config from '../config.js';

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: config.serviceName,
    correlationId: req.correlationId
  });
});

router.get('/ready', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return res.status(200).json({
      status: 'ready',
      service: config.serviceName,
      correlationId: req.correlationId
    });
  } catch (err) {
    return res.status(503).json({
      error: {
        code: 'DB_UNAVAILABLE',
        message: 'Database not reachable',
        details: null,
        correlationId: req.correlationId
      }
    });
  }
});

export default router;
