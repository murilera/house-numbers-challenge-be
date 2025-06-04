import { generateToken, verifyToken } from '../../src/auth/auth';
import jwt from 'jsonwebtoken';
import config from '../../src/config/config';

interface TokenPayload {
  username: string;
}

describe('JWT Utility', () => {
  const payload = { username: 'testuser' };

  it('should generate a valid JWT token', () => {
    const token = generateToken(payload);
    expect(typeof token).toBe('string');

    const decoded = jwt.verify(token, config.jwtSecret);
    expect((decoded as TokenPayload).username).toBe('testuser');
  });

  it('should verify and return the payload from a valid token', () => {
    const token = jwt.sign(payload, config.jwtSecret);
    const result = verifyToken(token);
    expect(typeof result).toBe('object');
    expect((result as TokenPayload).username).toBe('testuser');
  });

  it('should throw an error for invalid token', () => {
    expect(() => verifyToken('invalid.token.here')).toThrow();
  });
});
