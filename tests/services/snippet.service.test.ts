import {
  createSnippet,
  getSnippetById,
} from '../../src/services/snippet.service';
import { generateSummary } from '../../src/services/ai/ai.service';
import Snippet from '../../src/models/snippet.model';

jest.mock('../../src/services/ai/ai.service.ts', () => ({
  generateSummary: jest.fn(),
}));
jest.mock('../../src/models/snippet.model');

describe('snippetService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createSnippet', () => {
    it('should generate a summary and save a snippet', async () => {
      (generateSummary as jest.Mock).mockResolvedValue('summary');
      const saveMock = jest.fn().mockResolvedValue({
        _id: 'id123',
        text: 'test content',
        summary: 'summary',
      });
      (Snippet as unknown as jest.Mock).mockImplementation(() => ({
        save: saveMock,
      }));

      const result = await createSnippet('test content');

      expect(generateSummary).toHaveBeenCalledWith('test content');
      expect(saveMock).toHaveBeenCalled();
      expect(result.text).toBe('test content');
      expect(result.summary).toBe('summary');
    });

    it('should throw if generateSummary fails', async () => {
      (generateSummary as jest.Mock).mockRejectedValue(new Error('fail'));

      await expect(createSnippet('fail content')).rejects.toThrow('fail');
    });
  });

  describe('getSnippetById', () => {
    it('should return a snippet for a valid ID', async () => {
      const snippetData = {
        _id: 'id123',
        text: 'abc',
        summary: 'xyz',
      };
      (Snippet.findById as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(snippetData),
      });

      const result = await getSnippetById('id123');
      expect(result).toEqual(snippetData);
    });

    it('should return null for non-existent ID', async () => {
      (Snippet.findById as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      const result = await getSnippetById('bad-id');
      expect(result).toBeNull();
    });
  });
});
