import { GoogleGenAI } from '@google/genai';
import { AIProvider } from '../ai.service';
import { logger } from '../../../utils/logger';
import config from '../../../config/config';

const getGeminiClient = () => {
  return new GoogleGenAI({ apiKey: config.aiProviderKey });
};

export const geminiProvider: AIProvider = {
  summarize: async (text: string): Promise<string> => {
    if (!text) {
      return 'Please provide the text you would like me to summarize.';
    }

    const prompt = `Summarize in ≤ 30 words:\n${text}`;

    try {
      const gemini = getGeminiClient();
      const summary = await gemini.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
      });

      return summary.text || 'Summary unavailable.';
    } catch (error) {
      logger.error('Gemini API error:', error);
      throw new Error('AI summary generation failed.');
    }
  },
};
