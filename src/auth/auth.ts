import jwt from 'jsonwebtoken';
import config from '../config/config';

const JWT_SECRET = config.jwtSecret || 'super-secret';

export function generateToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

export function verifyToken(token: string): string | object {
  return jwt.verify(token, JWT_SECRET);
}
