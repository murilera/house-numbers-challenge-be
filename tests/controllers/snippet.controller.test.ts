import { Request, Response } from 'express';
import { snippetsController } from '../../src/controllers/snippet.controller';
import {
  createSnippet,
  getSnippetById,
} from '../../src/services/snippet.service';

jest.mock('../../src/services/snippet.service', () => ({
  createSnippet: jest.fn(),
  getSnippetById: jest.fn(),
}));

describe('Snippet Controller', () => {
  const mockResponse = (): Response => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn().mockReturnThis();
    return res;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if text is missing', async () => {
    const req = { body: {} } as Request;
    const res = mockResponse();

    await snippetsController.createSnippet(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Text is required and must be a string.',
    });
  });

  it('should call service and return 201 with snippet data', async () => {
    const req = { body: { text: 'test text' } } as Request;
    const res = mockResponse();

    (createSnippet as jest.Mock).mockResolvedValue({
      _id: { toString: () => 'id123' },
      text: 'test text',
      summary: 'summary',
    });

    await snippetsController.createSnippet(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id: 'id123',
      text: 'test text',
      summary: 'summary',
    });
  });

  it('should return 400 for invalid ID on get', async () => {
    const req = { params: { id: 'badid' } } as unknown as Request;
    const res = mockResponse();

    await snippetsController.getSnippetById(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid snippet ID.' });
  });

  it('should call next with error on service failure', async () => {
    const req = { body: { text: 'text' } } as Request;
    const res = mockResponse();
    const next = jest.fn();

    (createSnippet as jest.Mock).mockRejectedValue(new Error('fail'));

    await snippetsController.createSnippet(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });

  it('should call next with error if service throws', async () => {
    const req = {
      params: { id: 'aaaa1111aaaa1111aaaa1111' },
    } as unknown as Request;
    const res = mockResponse();
    const next = jest.fn();

    (getSnippetById as jest.Mock).mockRejectedValue(new Error('fail'));

    await snippetsController.getSnippetById(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});
