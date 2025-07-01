import Redis from 'ioredis';
export declare class RedisService {
    private client;
    constructor();
    getClient(): Redis;
}
