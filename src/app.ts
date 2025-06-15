import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import snippers from './routes/snippets.routes';
import { errorHandler } from './middlewares/errorHandler.middleware';
import { notFoundHandler } from './middlewares/notFoundHandler.middleware';
import { authenticate } from './middlewares/auth.middleware';
import config from './config/config';

const app = express();

app.use(
  cors({
    origin: config.frontendUrl,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'Accept-Language',
      'Cookie',
    ],
    credentials: true,
  }),
);

app.use(express.json());

app.get('/liveness-check', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/snippets', authenticate, snippers);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
