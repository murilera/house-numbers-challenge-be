import app from './app';
import config from './config/config';
import { logger } from './utils/logger';

app.listen(config.port, () => {
  logger.log(`Server running on port ${config.port}`);
});
