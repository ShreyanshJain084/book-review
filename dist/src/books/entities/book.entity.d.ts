import { Review } from '../../reviews/entities/review.entity';
export declare class Book {
    id: number;
    title: string;
    author: string;
    createdAt: Date;
    reviews: Review[];
}
