import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';

import config from './config.js';
import correlationId from './middlewares/correlationId.js';
import requestLogger from './middlewares/requestLogger.js';
import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/errorHandler.js';
import healthRoutes from './routes/health.js';
import serviceRoutes from './routes/service.js';

const require = createRequire(import.meta.url);
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

export default app;
