import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../auth/auth';
import { logger } from '../utils/logger';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = verifyToken(token);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (req as any).user = payload;
    next();
  } catch (err) {
    logger.error(err);
    return res.status(403).json({ error: 'Unauthorized' });
  }
}
