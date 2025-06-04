import { logger } from '../../src/utils/logger';

describe('logger utility', () => {
  let originalEnv: string;

  beforeAll(() => {
    originalEnv = process.env.NODE_ENV || '';
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
  });

  it('should log in development mode', () => {
    process.env.NODE_ENV = 'development';
    const spy = jest.spyOn(console, 'log').mockImplementation();
    logger.log('test');
    expect(spy).toHaveBeenCalledWith('test');
    spy.mockRestore();
  });

  it('should warn in development mode', () => {
    process.env.NODE_ENV = 'development';
    const spy = jest.spyOn(console, 'warn').mockImplementation();
    logger.warn('test');
    expect(spy).toHaveBeenCalledWith('test');
    spy.mockRestore();
  });

  it('should not log in production mode', () => {
    process.env.NODE_ENV = 'production';
    const spy = jest.spyOn(console, 'log').mockImplementation();
    logger.log('test');
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should always log errors except in test', () => {
    process.env.NODE_ENV = 'production';
    const spy = jest.spyOn(console, 'error').mockImplementation();
    logger.error('error');
    expect(spy).toHaveBeenCalledWith('error');
    spy.mockRestore();
  });

  it('should skip error logs in test mode', () => {
    process.env.NODE_ENV = 'test';
    const spy = jest.spyOn(console, 'error').mockImplementation();
    logger.error('error');
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});
