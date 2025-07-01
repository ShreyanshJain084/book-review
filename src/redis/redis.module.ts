import { Module } from '@nestjs/common';
import { RedisModule as NestjsRedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    NestjsRedisModule.forRoot({
      config: {
        host: 'localhost',
        port: 6379,
        retryStrategy: times => Math.min(times * 50, 2000),
      },
    }),
  ],
  exports: [NestjsRedisModule],
})
export class RedisModule {}
