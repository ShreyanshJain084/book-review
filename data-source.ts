// data-source.ts
import { DataSource } from 'typeorm';
import { Book } from './src/books/entities/book.entity';
import { Review } from './src/reviews/entities/review.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Hawk@2001',
  database: 'book_review',
  synchronize: false,
  logging: true,
  entities: [Book, Review],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
});
