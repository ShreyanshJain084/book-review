import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private client: Redis;

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    });

    this.client.on('error', (err) => {
      console.error('Redis connection error:', err);
    });
  }

  getClient(): Redis {
    return this.client;
  }
}
