import jwt from 'jsonwebtoken';
import config from '../config/config';

const JWT_SECRET = config.jwtSecret || 'super-secret';
const tokenBlacklist = new Set<string>();

export function generateToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

export function verifyToken(token: string): string | object {
  if (tokenBlacklist.has(token)) {
    throw new Error('Token has been invalidated');
  }
  return jwt.verify(token, JWT_SECRET);
}

export function invalidateToken(token: string): void {
  tokenBlacklist.add(token);
}

export function isTokenInvalidated(token: string): boolean {
  return tokenBlacklist.has(token);
}
