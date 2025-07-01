import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(bookId: number, dto: CreateReviewDto): Promise<import("./entities/review.entity").Review>;
    findAll(bookId: number): Promise<import("./entities/review.entity").Review[]>;
}
