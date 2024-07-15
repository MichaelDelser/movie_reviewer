import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../review.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  standalone: true,
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  @Input() contentId!: string;
  @Input() contentType!: string;
  reviews: any[] = [];

  constructor(private reviewService: ReviewService, public authService: AuthService) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.reviewService.getReviews(this.contentType, this.contentId).subscribe(reviews => {
      this.reviews = reviews;
    });
  }

  upvoteReview(reviewId: string): void {
    this.reviewService.upvoteReview(reviewId).subscribe(() => {
      this.loadReviews();
    });
  }
}
