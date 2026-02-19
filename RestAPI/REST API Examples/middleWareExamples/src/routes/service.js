const { Router } = require('express');
const { z } = require('zod');
const rateLimit = require('express-rate-limit');
const validate = require('../middlewares/validate');
const ApiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');

const router = Router();

const validateSchema = z.object({
  name: z.string().min(2).max(120)
});

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      error: {
        code: 'RATE_LIMITED',
        message: 'Too many requests for middleware demo endpoint',
        details: null,
        correlationId: req.correlationId
      }
    });
  }
});

function demoAuthGuard(req, res, next) {
  const header = req.header('authorization');
  if (header !== 'Bearer demo-token') {
    return next(new ApiError(401, 'Demo auth guard rejected request', 'UNAUTHORIZED'));
  }
  return next();
}

router.get('/middleware/correlation', (req, res) => {
  res.json({
    message: 'Correlation middleware working',
    correlationId: req.correlationId
  });
});

router.post('/middleware/validate', validate(validateSchema), (req, res) => {
  res.json({
    message: 'Validation middleware accepted payload',
    data: req.body
  });
});

router.get('/middleware/protected', demoAuthGuard, (req, res) => {
  res.json({
    message: 'Protected middleware route',
    correlationId: req.correlationId
  });
});

router.get('/middleware/rate-limited', limiter, (req, res) => {
  res.json({ message: 'Rate limiter example route' });
});

router.get(
  '/middleware/error',
  asyncHandler(async () => {
    throw new ApiError(500, 'Intentional demo error', 'DEMO_ERROR');
  })
);

module.exports = router;
