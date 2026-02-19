const { randomUUID } = require('crypto');

function correlationId(req, res, next) {
  const incoming = req.header('x-correlation-id');
  const correlationId = incoming && incoming.trim() ? incoming.trim() : randomUUID();
  req.correlationId = correlationId;
  res.setHeader('x-correlation-id', correlationId);
  next();
}

module.exports = correlationId;
