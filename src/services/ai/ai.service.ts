import { getAIProvider } from './providers';

export interface AIProvider {
  summarize(text: string): Promise<string>;
}

const providerName = process.env.AI_PROVIDER || 'openai';

export const generateSummary = (text: string): Promise<string> => {
  const provider = getAIProvider(providerName);
  return provider.summarize(text);
};
