import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { createSnippet, getSnippetById } from '../services/snippet.service';
import { logger } from '../utils/logger';

export const snippetsController = {
  createSnippet: async (req: Request, res: Response, next: NextFunction) => {
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
      res.status(400).json({ error: 'Text is required and must be a string.' });
      return;
    }

    try {
      const snippet = await createSnippet(text);
      res.status(201).json({
        id: snippet._id.toString(),
        text: snippet.text,
        summary: snippet.summary,
      });
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  getSnippetById: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid snippet ID.' });
      return;
    }

    try {
      const snippet = await getSnippetById(id);
      if (!snippet) {
        next({ error: 'Snippet not found.' });
        return;
      }

      res.json({
        id: snippet._id.toString(),
        text: snippet.text,
        summary: snippet.summary,
      });
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },
};
