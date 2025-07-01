// src/cache/cache.module.ts
import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';

@Global()                // makes providers available app‑wide
@Module({
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      useFactory: (redisService: RedisService) =>
        redisService.getClient(),
      inject: [RedisService],
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class CacheModule {}
