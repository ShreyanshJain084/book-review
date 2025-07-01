// // import { Module } from '@nestjs/common';
// // import { AppController } from './app.controller';
// // import { AppService } from './app.service';
// // import { BooksModule } from './books/books.module';
// // import { ReviewsModule } from './reviews/reviews.module';

// // @Module({
// //   imports: [BooksModule, ReviewsModule],
// //   controllers: [AppController],
// //   providers: [AppService],
// // })
// // export class AppModule {}

// import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Book } from './books/entities/book.entity';
// import { Review } from './reviews/entities/review.entity';
// import { BooksModule } from './books/books.module';
// import { ReviewsModule } from './reviews/reviews.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot({ isGlobal: true }),
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: process.env.DB_HOST,
//       port: +process.env.DB_PORT,
//       username: process.env.DB_USER,
//       password: process.env.DB_PASS,
//       database: process.env.DB_NAME,
//       entities: [Book, Review],
//       synchronize: true, // Note: Use migrations instead in production
//     }),
//     BooksModule,
//     ReviewsModule,
//   ],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './books/entities/book.entity';
import { Review } from './reviews/entities/review.entity';
import { BooksModule } from './books/books.module';
import { ReviewsModule } from './reviews/reviews.module';
import { RedisService } from './cache/redis.service';
import { CacheModule } from './cache/cache.module';
import { RedisModule } from './redis/redis.module';
@Module({
  imports: [
    // Load environment variables globally from .env file
    ConfigModule.forRoot({ isGlobal: true }),

    // Configure PostgreSQL connection using TypeORM
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Book, Review],
      synchronize: false, // Don't use in production — use migrations instead
    }),

    // Your application modules
    BooksModule,
    ReviewsModule,
    CacheModule, 
    RedisModule,    
  ],

  // Register Redis provider so it can be injected anywhere
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      useFactory: (redisService: RedisService) => redisService.getClient(),
      inject: [RedisService],
    },
  ],
})
export class AppModule {}
