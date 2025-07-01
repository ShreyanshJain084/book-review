import { Book } from '../../books/entities/book.entity';
export declare class Review {
    id: number;
    reviewer: string;
    reviewText: string;
    rating: number;
    createdAt: Date;
    bookId: number;
    book: Book;
}
