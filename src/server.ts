import app from './app';
import config from './config/config';
import { connectToDatabase } from './database/database';
import { logger } from './utils/logger';

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

connectToDatabase()
  .then(() => {
    app.listen(config.port, () => {
      logger.log(`Server running on port ${config.port}`);
    });
  })
  .catch((err) => {
    logger.error('Failed to connect to database:', err);
    process.exit(1);
  });
