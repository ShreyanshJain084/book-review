"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const book_entity_1 = require("./books/entities/book.entity");
const review_entity_1 = require("./reviews/entities/review.entity");
const books_module_1 = require("./books/books.module");
const reviews_module_1 = require("./reviews/reviews.module");
const redis_service_1 = require("./cache/redis.service");
const cache_module_1 = require("./cache/cache.module");
const redis_module_1 = require("./redis/redis.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT || '5432', 10),
                username: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_NAME,
                entities: [book_entity_1.Book, review_entity_1.Review],
                synchronize: false,
            }),
            books_module_1.BooksModule,
            reviews_module_1.ReviewsModule,
            cache_module_1.CacheModule,
            redis_module_1.RedisModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            redis_service_1.RedisService,
            {
                provide: 'REDIS_CLIENT',
                useFactory: (redisService) => redisService.getClient(),
                inject: [redis_service_1.RedisService],
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map