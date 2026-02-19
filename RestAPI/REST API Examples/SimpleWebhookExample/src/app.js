const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const config = require('./config');
const correlationId = require('./middlewares/correlationId');
const requestLogger = require('./middlewares/requestLogger');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
const healthRoutes = require('./routes/health');
const serviceRoutes = require('./routes/service');
const openApiSpec = require('./docs/openapi.json');

const app = express();

app.use(
  express.json({
    limit: config.payloadLimit,
    verify: (req, res, buffer) => {
      req.rawBody = buffer;
    }
  })
);
app.use(express.urlencoded({ extended: true, limit: config.payloadLimit }));
app.use(helmet());
app.use(
  cors({
    origin: config.corsOrigin === '*' ? true : config.corsOrigin.split(',').map((item) => item.trim())
  })
);
app.use(correlationId);
app.use(requestLogger);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));
app.get('/docs.json', (req, res) => {
  res.json(openApiSpec);
});

app.use(healthRoutes);
app.use(serviceRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
