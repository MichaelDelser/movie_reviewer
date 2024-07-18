import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Adjust the path as needed
import { ReviewService } from '../services/review.service';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common"; // Adjust the path as needed

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
  @Input() contentId!: string;
  @Input() contentType!: string;
  @Output() reviewAdded = new EventEmitter<any>();

  newReview: string = '';
  newReviewTitle: string = '';
  newReviewRating: number = 1;

  constructor(
    private reviewService: ReviewService,
    private authService: AuthService
  ) {}

  addReview(): void {
    const user = this.authService.currentUserValue?.user;
    if (user && this.newReview.trim() && this.newReviewTitle.trim() && this.newReviewRating) {
      this.reviewService.addReview(user.id, this.contentId, this.contentType, this.newReviewTitle, this.newReview, this.newReviewRating).subscribe((review) => {
        this.reviewAdded.emit(review);
        this.newReview = '';
        this.newReviewTitle = '';
        this.newReviewRating = 1;
      });
    }
  }

  setRating(rating: number): void {
    this.newReviewRating = rating;
  }
}
