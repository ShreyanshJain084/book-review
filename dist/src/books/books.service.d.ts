import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { Redis } from 'ioredis';
export declare class BooksService {
    private readonly bookRepo;
    private readonly redisClient;
    private readonly logger;
    constructor(bookRepo: Repository<Book>, redisClient: Redis);
    create(createBookDto: CreateBookDto): Promise<Book>;
    findAll(): Promise<Book[]>;
}
