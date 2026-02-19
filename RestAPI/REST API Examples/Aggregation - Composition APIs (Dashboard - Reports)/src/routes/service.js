const { Router } = require('express');
const { z } = require('zod');
const axios = require('axios');
const prisma = require('../lib/prisma');
const config = require('../config');
const validate = require('../middlewares/validate');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');

const router = Router();

const dashboardQuerySchema = z.object({
  timeoutMs: z.coerce.number().int().min(100).max(10000).optional()
});

const summaryQuerySchema = z.object({
  days: z.coerce.number().int().min(1).max(365).default(30)
});

function withTimeout(promise, timeoutMs) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error('EXTERNAL_TIMEOUT')), timeoutMs);
    })
  ]);
}

async function fetchExternalSnapshot() {
  const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
    params: {
      latitude: 40.7128,
      longitude: -74.006,
      current: 'temperature_2m,wind_speed_10m'
    },
    timeout: 5000
  });

  return {
    source: 'open-meteo',
    current: response.data.current
  };
}

router.get(
  '/dashboard',
  validate(dashboardQuerySchema, 'query'),
  asyncHandler(async (req, res) => {
    const timeoutMs = req.query.timeoutMs || config.externalTimeoutMs;
    const warnings = [];

    const dbPromise = prisma.teamStat.findMany({ orderBy: { metric: 'asc' } }).catch(() => {
      warnings.push('database metrics unavailable');
      return null;
    });

    const externalPromise = withTimeout(fetchExternalSnapshot(), timeoutMs).catch((err) => {
      warnings.push(err.message === 'EXTERNAL_TIMEOUT' ? 'external API timeout' : 'external API unavailable');
      return null;
    });

    const [metrics, external] = await Promise.all([dbPromise, externalPromise]);

    if (!metrics && !external) {
      throw new ApiError(503, 'No downstream dependencies available', 'DOWNSTREAM_UNAVAILABLE');
    }

    res.json({
      data: {
        metrics,
        external
      },
      warnings
    });
  })
);

router.get(
  '/reports/summary',
  validate(summaryQuerySchema, 'query'),
  asyncHandler(async (req, res) => {
    const since = new Date(Date.now() - req.query.days * 24 * 60 * 60 * 1000);

    const [overall, byRegion] = await Promise.all([
      prisma.salesRecord.aggregate({
        where: { createdAt: { gte: since } },
        _count: true,
        _sum: { amount: true }
      }),
      prisma.salesRecord.groupBy({
        by: ['region'],
        where: { createdAt: { gte: since } },
        _count: true,
        _sum: { amount: true }
      })
    ]);

    res.json({
      data: {
        windowDays: req.query.days,
        totalOrders: overall._count,
        totalAmount: overall._sum.amount || 0,
        byRegion
      }
    });
  })
);

module.exports = router;
