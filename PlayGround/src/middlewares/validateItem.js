function badRequest(message) {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
}

function validateIdParam(req, res, next) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return next(badRequest('id must be a positive integer'));
  }

  req.params.id = id;
  return next();
}

function validateCreateItem(req, res, next) {
  if (typeof req.body?.name !== 'string' || req.body.name.trim() === '') {
    return next(badRequest('name is required'));
  }

  req.body.name = req.body.name.trim();
  return next();
}

function validateUpdateItem(req, res, next) {
  if (!Object.prototype.hasOwnProperty.call(req.body, 'name')) {
    return next(badRequest('name is required for update'));
  }

  if (typeof req.body.name !== 'string' || req.body.name.trim() === '') {
    return next(badRequest('name must be a non-empty string'));
  }

  req.body.name = req.body.name.trim();
  return next();
}

export { validateIdParam, validateCreateItem, validateUpdateItem };
