import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CacheModule } from '../cache/cache.module'; // ✅
@Module({
  imports: [
    TypeOrmModule.forFeature([Book]), // ✅ <-- This is what you missed
    CacheModule, 
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService] 
})
export class BooksModule {}
