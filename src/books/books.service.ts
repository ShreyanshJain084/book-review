import { Injectable, Inject, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { Redis } from 'ioredis';

@Injectable()
export class BooksService {
  private readonly logger = new Logger(BooksService.name);

  constructor(
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,

    @Inject('REDIS_CLIENT')
    private readonly redisClient: Redis,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.bookRepo.create(createBookDto);
    const savedBook = await this.bookRepo.save(book);

    this.logger.log(`Created new book: ${savedBook.title}`);

    // Safely invalidate cache
    try {
      await this.redisClient.del('books:all');
      this.logger.log('Cache invalidated: books:all');
    } catch (error) {
      this.logger.warn('Failed to invalidate Redis cache for books:all', error);
    }

    return savedBook;
  }

  async findAll(): Promise<Book[]> {
    try {
      // Attempt to read from Redis
      const cached = await this.redisClient.get('books:all');
      if (cached) {
        this.logger.log('Books loaded from Redis cache');
        return JSON.parse(cached);
      }
    } catch (error) {
      this.logger.warn('Redis GET failed. Falling back to DB.', error);
    }

    // Cache miss or Redis error → Fetch from DB
    const books = await this.bookRepo.find();

    try {
      // Attempt to write to cache
      await this.redisClient.set('books:all', JSON.stringify(books), 'EX', 60);
      this.logger.log('Books cached in Redis');
    } catch (error) {
      this.logger.warn('Redis SET failed. Continuing without cache.', error);
    }

    return books;
  }
}
