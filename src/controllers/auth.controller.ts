import { NextFunction, Request, Response } from 'express';
import { generateToken } from '../auth/auth';
import { logger } from '../utils/logger';

export const authController = {
  generateToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username } = req.body;

      if (username !== 'admin') {
        res.status(400).json({ error: 'Username invalid' });
        return;
      }

      const token = generateToken({ username });
      res.json({ access_token: token, token_type: 'Bearer' });
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },
};
