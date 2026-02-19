const { Router } = require('express');
const config = require('../config');

const router = Router();
const buckets = new Map();

function consumeToken(key) {
  const now = Date.now() / 1000;
  const capacity = config.throttleCapacity;
  const refillRate = config.throttleRefillPerSec;

  let bucket = buckets.get(key);
  if (!bucket) {
    bucket = {
      tokens: capacity,
      lastRefillAt: now
    };
  }

  const elapsed = now - bucket.lastRefillAt;
  const refill = elapsed * refillRate;
  bucket.tokens = Math.min(capacity, bucket.tokens + refill);
  bucket.lastRefillAt = now;

  if (bucket.tokens >= 1) {
    bucket.tokens -= 1;
    buckets.set(key, bucket);
    return {
      allowed: true,
      remaining: bucket.tokens,
      retryAfterSeconds: 0
    };
  }

  const retryAfterSeconds = refillRate > 0 ? (1 - bucket.tokens) / refillRate : Number.POSITIVE_INFINITY;
  buckets.set(key, bucket);
  return {
    allowed: false,
    remaining: bucket.tokens,
    retryAfterSeconds
  };
}

router.get('/throttle/config', (req, res) => {
  res.json({
    data: {
      capacity: config.throttleCapacity,
      refillPerSecond: config.throttleRefillPerSec
    }
  });
});

router.get('/throttle', (req, res) => {
  const apiKey = req.header('x-api-key');
  const key = apiKey || req.ip;
  const mode = apiKey ? 'api-key' : 'ip';
  const result = consumeToken(mode + ':' + key);

  if (!result.allowed) {
    res.setHeader('Retry-After', Math.ceil(result.retryAfterSeconds));
    return res.status(429).json({
      error: {
        code: 'THROTTLED',
        message: 'Token bucket depleted',
        details: {
          retryAfterSeconds: Number.isFinite(result.retryAfterSeconds) ? Math.ceil(result.retryAfterSeconds) : null
        },
        correlationId: req.correlationId
      }
    });
  }

  return res.json({
    data: {
      message: 'Request allowed by token bucket',
      mode,
      remainingTokens: Number(result.remaining.toFixed(2))
    }
  });
});

module.exports = router;
