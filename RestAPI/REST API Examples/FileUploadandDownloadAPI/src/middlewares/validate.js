function validate(schema, target = 'body') {
  return (req, res, next) => {
    const parsed = schema.safeParse(req[target]);
    if (!parsed.success) {
      return next(parsed.error);
    }
    req[target] = parsed.data;
    return next();
  };
}

module.exports = validate;
