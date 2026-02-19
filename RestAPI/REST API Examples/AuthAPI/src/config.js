const dotenv = require('dotenv');
dotenv.config();

const numberValue = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

module.exports = {
  serviceName: process.env.SERVICE_NAME || 'REST API Service',
  port: numberValue(process.env.PORT, 3000),
  corsOrigin: process.env.CORS_ORIGIN || '*',
  payloadLimit: process.env.PAYLOAD_LIMIT || '1mb',
  logLevel: process.env.LOG_LEVEL || 'info',
  nodeEnv: process.env.NODE_ENV || 'development',
  debounceMs: numberValue(process.env.DEBOUNCE_MS, 350),
  rateLimitWindowMs: numberValue(process.env.RATE_LIMIT_WINDOW_MS, 60000),
  rateLimitMax: numberValue(process.env.RATE_LIMIT_MAX, 5),
  apiKeyRateLimitMax: numberValue(process.env.API_KEY_RATE_LIMIT_MAX, 10),
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || 'dev-access-secret',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret',
  jwtAccessTtl: process.env.JWT_ACCESS_TTL || '15m',
  jwtRefreshTtl: process.env.JWT_REFRESH_TTL || '7d',
  webhookSecret: process.env.WEBHOOK_SECRET || 'demo-webhook-secret',
  uploadDir: process.env.UPLOAD_DIR || 'uploads',
  uploadMaxBytes: numberValue(process.env.UPLOAD_MAX_BYTES, 5 * 1024 * 1024),
  uploadAllowedTypes: (process.env.UPLOAD_ALLOWED_TYPES || 'text/plain,image/png,image/jpeg,application/pdf')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean),
  externalTimeoutMs: numberValue(process.env.EXTERNAL_TIMEOUT_MS, 1200),
  throttleCapacity: numberValue(process.env.THROTTLE_CAPACITY, 5),
  throttleRefillPerSec: numberValue(process.env.THROTTLE_REFILL_PER_SEC, 1)
};
