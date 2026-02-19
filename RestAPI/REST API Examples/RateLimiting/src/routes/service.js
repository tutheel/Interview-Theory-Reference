const { Router } = require('express');
const rateLimit = require('express-rate-limit');
const config = require('../config');
const ApiError = require('../utils/apiError');

const router = Router();

function rateLimitExceeded(req, res) {
  res.status(429).json({
    error: {
      code: 'RATE_LIMITED',
      message: 'Too many requests',
      details: null,
      correlationId: req.correlationId
    }
  });
}

const ipLimiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip,
  handler: rateLimitExceeded
});

const apiKeyLimiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.apiKeyRateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.header('x-api-key') || 'missing-key',
  handler: rateLimitExceeded
});

router.get('/limited/config', (req, res) => {
  res.json({
    data: {
      rateLimitWindowMs: config.rateLimitWindowMs,
      rateLimitMax: config.rateLimitMax,
      apiKeyRateLimitMax: config.apiKeyRateLimitMax
    }
  });
});

router.get(
  '/limited',
  (req, res, next) => {
    const apiKey = req.header('x-api-key');
    if (apiKey === '') {
      return next(new ApiError(400, 'x-api-key cannot be empty', 'VALIDATION_ERROR'));
    }
    if (apiKey) {
      return apiKeyLimiter(req, res, next);
    }
    return ipLimiter(req, res, next);
  },
  (req, res) => {
    res.json({
      data: {
        message: 'Request allowed',
        mode: req.header('x-api-key') ? 'api-key' : 'ip'
      }
    });
  }
);

module.exports = router;
