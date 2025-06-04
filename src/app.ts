import express from 'express';
import authRoutes from './routes/auth.routes';
import snippers from './routes/snippets.routes';
import { errorHandler } from './middlewares/errorHandler.middleware';
import { notFoundHandler } from './middlewares/notFoundHandler.middleware';
import { authenticate } from './middlewares/auth.middleware';

const app = express();

app.use(express.json());

app.get('/liveness-check', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/v1/api/snippets', authenticate, snippers);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
