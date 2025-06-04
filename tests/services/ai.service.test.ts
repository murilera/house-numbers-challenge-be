import { generateSummary } from '../../src/services/ai/ai.service';
import { getAIProvider } from '../../src/services/ai/providers';

jest.mock('../../src/services/ai/providers', () => ({
  getAIProvider: jest.fn(),
}));

const mockedProvider = {
  summarize: jest.fn(),
};

describe('AI Service', () => {
  const originalEnv = process.env.AI_PROVIDER;

  beforeEach(() => {
    jest.clearAllMocks();
    (getAIProvider as jest.Mock).mockReturnValue(mockedProvider);
    process.env.AI_PROVIDER = originalEnv;
  });

  it('should use configured AI provider to summarize', async () => {
    mockedProvider.summarize.mockResolvedValue('summary');

    const result = await generateSummary('test input');
    expect(getAIProvider).toHaveBeenCalledWith(originalEnv || 'openai');
    expect(mockedProvider.summarize).toHaveBeenCalledWith('test input');
    expect(result).toBe('summary');
  });
});
