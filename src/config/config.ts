import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  mongoUri: string;
  aiProvider: string;
  aiProviderKey: string;
  jwtSecret: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/snippets',
  aiProvider: process.env.AI_PROVIDER || 'openai',
  aiProviderKey: process.env.AI_PROVIDER_KEY || 'fake-key',
  jwtSecret: process.env.JWT_SECRET || 'super-secret',
};

export default config;
