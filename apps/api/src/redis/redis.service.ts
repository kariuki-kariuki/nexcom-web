import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RedisService {
  store = new Map();

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async setSignedUrl(key: string, url: string, exp: number) {
    this.cacheManager.set(key, url, exp * 1000);
  }

  async getSignedUrl(key: string) {
    return this.cacheManager.get(key);
  }

  async deleteSignedUrl(key: string) {
    return this.cacheManager.del(key);
  }
}
