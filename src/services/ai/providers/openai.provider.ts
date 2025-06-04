import { AIProvider } from '../ai.service';
import { logger } from '../../../utils/logger';
import config from '../../../config/config';
import OpenAI from 'openai';

const getOpenAI = (): OpenAI => {
  return new OpenAI({ apiKey: config.aiProviderKey });
};

export const openAIProvider: AIProvider = {
  summarize: async (text: string): Promise<string> => {
    if (!text) {
      return 'Please provide the text you would like me to summarize.';
    }

    const prompt = `Summarize in ≤ 30 words:\n${text}`;

    try {
      const openai = getOpenAI();
      const response = await openai.chat.completions.create({
        model: 'gpt-4.1',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 100,
      });

      return (
        response.choices[0].message.content?.trim() || 'Summary unavailable.'
      );
    } catch (error) {
      logger.error('OpenAI API error:', error);
      throw new Error('AI summary generation failed.');
    }
  },
};
