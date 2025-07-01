import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne ,Index} from 'typeorm';
import { Book } from '../../books/entities/book.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Index('idx_review_bookId', ['bookId'])
export class Review {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  reviewer: string;

   @ApiProperty()
  @Column()
  reviewText: string;

  @ApiProperty()
  @Column()
  rating: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
  
  @ApiProperty()
  @Column()
  bookId: number; 

  @ManyToOne(() => Book, (book) => book.reviews, { onDelete: 'CASCADE' })
  @Index()
  book: Book; 
}
