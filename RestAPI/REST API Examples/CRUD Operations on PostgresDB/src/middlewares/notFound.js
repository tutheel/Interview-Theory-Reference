import ApiError from '../utils/apiError.js';

export default function notFound(req, res, next) {
  next(new ApiError(404, 'Route not found', 'NOT_FOUND'));
}
