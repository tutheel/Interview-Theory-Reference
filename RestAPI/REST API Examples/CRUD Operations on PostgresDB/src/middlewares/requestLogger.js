import logger from '../lib/logger.js';

function requestLogger(req, res, next) {
  const startedAt = Date.now();

  res.on('finish', () => {
    logger.info(
      {
        correlationId: req.correlationId,
        method: req.method,
        path: req.originalUrl,
        statusCode: res.statusCode,
        durationMs: Date.now() - startedAt
      },
      'request.completed'
    );
  });

  next();
}

export default requestLogger;
