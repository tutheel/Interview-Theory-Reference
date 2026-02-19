import express from 'express';
import healthRoutes from './routes/healthRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());

app.use(healthRoutes);
app.use(itemRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
