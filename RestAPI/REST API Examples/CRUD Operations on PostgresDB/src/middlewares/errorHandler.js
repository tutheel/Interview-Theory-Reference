import { ZodError } from 'zod';
import logger from '../lib/logger.js';
import ApiError from '../utils/apiError.js';

export default function errorHandler(err, req, res, next) {
  let statusCode = 500;
  let code = 'INTERNAL_ERROR';
  let message = 'Internal server error';
  let details = null;

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    code = err.code;
    message = err.message;
    details = err.details;
  } else if (err instanceof ZodError) {
    statusCode = 400;
    code = 'VALIDATION_ERROR';
    message = 'Validation failed';
    details = err.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message
    }));
  } else if (err && err.code === 'P2002') {
    statusCode = 409;
    code = 'CONFLICT';
    message = 'Resource already exists';
  } else if (err && err.code === 'P2025') {
    statusCode = 404;
    code = 'NOT_FOUND';
    message = 'Resource not found';
  }

  logger.error(
    {
      correlationId: req.correlationId,
      err
    },
    'request.failed'
  );

  res.status(statusCode).json({
    error: {
      code,
      message,
      details,
      correlationId: req.correlationId || null
    }
  });
}
