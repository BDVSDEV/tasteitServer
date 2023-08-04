import MemcachedCacheService from '../memcached-cache';
import Memcached from 'memcached';

const mockGet = jest.fn();
const mockSet = jest.fn();
const mockDel = jest.fn();

jest.mock('memcached', () => {
  return jest.fn().mockImplementation(() => ({
    get: mockGet,
    set: mockSet,
    del: mockDel,
  }));
});

describe('MemcachedCacheService', () => {
  let cacheService: MemcachedCacheService;

  beforeEach(() => {
    mockGet.mockClear();
    mockSet.mockClear();
    mockDel.mockClear();

    const options = {
      location: 'localhost:11211',
    };

    cacheService = new MemcachedCacheService({ logger: console }, options);
  });

  test('should get a cached value', async () => {
    mockGet.mockImplementation((key, callback) => callback(null, JSON.stringify({ foo: 'bar' })));

    const value = await cacheService.get('test-key');
    expect(value).toEqual({ foo: 'bar' });
  });

  test('should set a cached value', async () => {
    mockSet.mockImplementation((key, value, ttl, callback) => callback(null));

    await expect(
      cacheService.set('test-key', { foo: 'bar' })
    ).resolves.toBeUndefined();
  });

  test('should invalidate a cached value', async () => {
    mockDel.mockImplementation((key, callback) => callback(null));

    await expect(
      cacheService.invalidate('test-key')
    ).resolves.toBeUndefined();
  });
});
