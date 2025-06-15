import { NextFunction, Request, Response } from 'express';
import { generateToken, invalidateToken } from '../auth/auth';
import { logger } from '../utils/logger';

export const authController = {
  generateToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      if (email === 'admin@mail.com' && password === 'password') {
        const token = generateToken({ userEmail: email });
        res.cookie('__session', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 3600 * 1000, // 1 hour in milliseconds
        });
        res.json({
          access_token: token,
          token_type: 'Bearer',
          expires_in: 3600,
        });
        return;
      }

      res.status(400).json({ error: 'Invalid credentials' });
      return;
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  expireToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.cookie?.split('=')[1];

      if (!token) {
        res.status(401).json({ error: 'Missing authentication token' });
        return;
      }
      invalidateToken(token);
      res.status(200).json({ message: 'Logged out successfully' });
      return;
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },
};
