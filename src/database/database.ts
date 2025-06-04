import mongoose from 'mongoose';
import { logger } from '../utils/logger';
import config from '../config/config';

export const connectToDatabase = async (): Promise<void> => {
  const uri = config.mongoUri;
  if (!uri) {
    throw new Error('Missing MONGO_URI in environment.');
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    logger.log('Connected to MongoDB');
  } catch (err) {
    logger.error('MongoDB connection error');
    throw err;
  }
};
