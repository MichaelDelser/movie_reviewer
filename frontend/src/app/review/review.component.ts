import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../review.service';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  @Input() contentType!: string;
  @Input() contentId!: string;

  reviews: any[] = [];
  newReview = { title: '', content: '', rating: 0 };
  stars: boolean[] = Array(10).fill(false); // 10 stars
  hoverIndex = -1;
  errorMessages: any = {};

  constructor(
    private reviewService: ReviewService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.reviewService.getReviews(this.contentType, this.contentId).subscribe(reviews => {
      this.reviews = reviews;
    });
  }

  addReview(): void {
    const reviewData = {
      user_id: this.authService.currentUserValue.id,
      content_id: this.contentId,
      content_type: this.contentType,
      title: this.newReview.title,
      content: this.newReview.content || '',
      rating: this.newReview.rating
    };

    this.reviewService.addReview(reviewData).subscribe(
      () => {
        this.loadReviews();
        this.newReview = { title: '', content: '', rating: 0 };
        this.resetStars();
        this.errorMessages = {};
      },
      (error: HttpErrorResponse) => {
        if (error.error.errors) {
          this.errorMessages = error.error.errors.reduce((acc: any, err: any) => {
            acc[err.path] = err.msg;
            return acc;
          }, {});
        }
      }
    );
  }

  highlightStars(index: number): void {
    this.hoverIndex = index + 1;
  }

  resetStars(): void {
    this.hoverIndex = -1;
  }

  rateMovie(rating: number): void {
    this.newReview.rating = rating;
    this.resetStars();
  }

  upvoteReview(reviewId: string): void {
    this.reviewService.upvoteReview(reviewId).subscribe(() => {
      this.loadReviews();
    });
  }
}
