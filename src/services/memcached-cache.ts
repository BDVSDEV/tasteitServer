import { ICacheService } from "@medusajs/types"
import Memcached from "memcached"

const DEFAULT_CACHE_TIME = 30

export type MemcachedCacheModuleOptions = {
  /**
   * Time to keep data in the cache (in seconds)
   */
  ttl?: number

  /**
    * Allow passing the configuration for Memcached client
    */
  location: Memcached.Location
  options?: Memcached.options
}

class MemcachedCacheService implements ICacheService {
  protected readonly memcached: Memcached
  protected readonly TTL: number

  constructor(
    {
      // inject services through dependency injection
      // for example you can access the logger
      logger,
    },
    options: MemcachedCacheModuleOptions
  ) {
    this.memcached = new Memcached(
      options.location, 
      options.options
    )
    this.TTL = options.ttl || DEFAULT_CACHE_TIME
  }
  async get<T>(cacheKey: string): Promise<T | null> {
    return new Promise((res, rej) => {
      this.memcached.get(cacheKey, (err, data) => {
        if (err) {
          res(null)
        } else {
          if (data) {
            res(JSON.parse(data))
          } else {
            res(null)
          }
        }
      })
    })
  }
  async set(
    key: string,
    data: Record<string, unknown>,
    ttl: number = this.TTL
  ): Promise<void> {
    return new Promise((res, rej) =>
      this.memcached.set(
        key, JSON.stringify(data), ttl, (err) => {
        if (err) {
          rej(err)
        } else {
          res()
        }
      })
    )
  }
  async invalidate(key: string): Promise<void> {
    return new Promise((res, rej) => {
      this.memcached.del(key, (err) => {
        if (err) {
          rej(err)
        } else {
          res()
        }
      })
    })
  }

}

export default MemcachedCacheService