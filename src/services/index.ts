import { ModuleExports } from "@medusajs/modules-sdk"

import MemcachedCacheService  from "./memcached-cache"

const service = MemcachedCacheService

const moduleDefinition: ModuleExports = {
  service,
}

export default moduleDefinition