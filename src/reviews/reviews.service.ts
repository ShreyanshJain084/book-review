import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { Book } from '../books/entities/book.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepo: Repository<Review>,

    @InjectRepository(Book)
    private bookRepo: Repository<Book>,
  ) {}

  async create(bookId: number, dto: CreateReviewDto): Promise<Review> {
    const book = await this.bookRepo.findOne({ where: { id: bookId } });
    if (!book) throw new NotFoundException('Book not found');

    const review = this.reviewRepo.create({ ...dto, book });
    return this.reviewRepo.save(review);
  }

  async findByBook(bookId: number): Promise<Review[]> {
    return this.reviewRepo.find({
      where: { book: { id: bookId } },
      relations: ['book'],
      order: { createdAt: 'DESC' },
    });
  }
}
