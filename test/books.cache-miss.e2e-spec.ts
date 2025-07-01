import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from '../src/books/entities/book.entity';
import { Repository } from 'typeorm';
import { Redis } from 'ioredis';

describe('BooksController - Cache Miss (e2e)', () => {
  let app: INestApplication;
  let bookRepo: Repository<Book>;
  let redisClient: Redis;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    bookRepo = moduleFixture.get<Repository<Book>>(getRepositoryToken(Book));
    redisClient = moduleFixture.get<Redis>('REDIS_CLIENT');
  });

  afterAll(async () => {
    await app.close();
  });

  it('should fetch from DB on cache miss and then populate Redis', async () => {
    // Step 1: Clear Redis cache
    await redisClient.del('books:all');

    // Step 2: Insert a book directly into DB
    const book = bookRepo.create({ title: 'Cache Miss Book', author: 'DB Source' });
    await bookRepo.save(book);

    // Step 3: Perform GET request
    const res = await request(app.getHttpServer()).get('/books');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'Cache Miss Book', author: 'DB Source' }),
      ]),
    );

    // Step 4: Check that Redis is now populated
    const cached = await redisClient.get('books:all');
    expect(cached).not.toBeNull();

    const parsed = JSON.parse(cached as string);
    expect(parsed).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'Cache Miss Book' }),
      ]),
    );
  });
});
