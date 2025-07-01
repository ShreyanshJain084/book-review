"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var BooksService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const book_entity_1 = require("./entities/book.entity");
const ioredis_1 = require("ioredis");
let BooksService = BooksService_1 = class BooksService {
    constructor(bookRepo, redisClient) {
        this.bookRepo = bookRepo;
        this.redisClient = redisClient;
        this.logger = new common_1.Logger(BooksService_1.name);
    }
    async create(createBookDto) {
        const book = this.bookRepo.create(createBookDto);
        const savedBook = await this.bookRepo.save(book);
        this.logger.log(`Created new book: ${savedBook.title}`);
        try {
            await this.redisClient.del('books:all');
            this.logger.log('Cache invalidated: books:all');
        }
        catch (error) {
            this.logger.warn('Failed to invalidate Redis cache for books:all', error);
        }
        return savedBook;
    }
    async findAll() {
        try {
            const cached = await this.redisClient.get('books:all');
            if (cached) {
                this.logger.log('Books loaded from Redis cache');
                return JSON.parse(cached);
            }
        }
        catch (error) {
            this.logger.warn('Redis GET failed. Falling back to DB.', error);
        }
        const books = await this.bookRepo.find();
        try {
            await this.redisClient.set('books:all', JSON.stringify(books), 'EX', 60);
            this.logger.log('Books cached in Redis');
        }
        catch (error) {
            this.logger.warn('Redis SET failed. Continuing without cache.', error);
        }
        return books;
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = BooksService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(book_entity_1.Book)),
    __param(1, (0, common_1.Inject)('REDIS_CLIENT')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        ioredis_1.Redis])
], BooksService);
//# sourceMappingURL=books.service.js.map