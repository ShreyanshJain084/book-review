import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { Book } from '../books/entities/book.entity';
export declare class ReviewsService {
    private reviewRepo;
    private bookRepo;
    constructor(reviewRepo: Repository<Review>, bookRepo: Repository<Book>);
    create(bookId: number, dto: CreateReviewDto): Promise<Review>;
    findByBook(bookId: number): Promise<Review[]>;
}
