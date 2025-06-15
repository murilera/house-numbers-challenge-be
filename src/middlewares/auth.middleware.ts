import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../auth/auth';
import { logger } from '../utils/logger';

export interface AuthenticatedRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.cookie?.split('=')[1];

  if (!token) {
    res.status(401).json({ error: 'Missing authentication token' });
    return;
  }

  try {
    const payload = verifyToken(token);
    (req as AuthenticatedRequest).user = payload;
    next();
  } catch (err) {
    logger.error('Token verification failed:', err);
    res.status(403).json({ error: 'Unauthorized' });
    return;
  }
}
