import { openAIProvider } from './openai.provider';
import { geminiProvider } from './gemini.provider';
import { AIProvider } from '../ai.service';

export const getAIProvider = (providerName: string): AIProvider => {
  switch (providerName.toLowerCase()) {
    case 'openai':
      return openAIProvider;
    case 'gemini':
      return geminiProvider;
    default:
      throw new Error(`Unsupported AI provider: ${providerName}`);
  }
};
