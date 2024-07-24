import { Component, OnInit, Input } from '@angular/core';
import { ReviewService } from '../services/review.service';
import { AuthService } from '../services/auth.service';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  @Input() contentId!: string;
  @Input() contentType!: string;

  reviews: any[] = [];
  newReview = '';
  newReviewTitle = '';
  newReviewRating = 0;
  editingReviewId: string | null = null;
  editingReviewTitle = '';
  editingReviewContent = '';
  editingReviewRating = 0;
  tempEditingRating = 0;
  user: any;
  errorMessages: string[] = [];
  hasWrittenReview: boolean = false;
  tempRating: number = 0;

  constructor(
    private reviewService: ReviewService,
    private authService: AuthService
  ) {
    this.user = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.reviewService.getReviews(this.contentType, this.contentId).subscribe((reviews) => {
      this.reviews = reviews;
      this.reviews.forEach((review) => {
        console.log(review);
        review.upvotesCount = review.helpfulness || 0; // Ensure upvotesCount is a number
        this.reviewService.hasUpvoted(this.user.id, review._id).subscribe((hasUpvoted) => {
          review.hasUpvoted = hasUpvoted.hasUpvoted;
        });

        if (review.user_id === this.user.id) {
          this.hasWrittenReview = true;
        }
      });
    });
  }

  addReview(): void {
    this.errorMessages = [];  // Clear previous error messages

    this.reviewService.addReview(this.user.id, this.contentId, this.contentType, this.newReviewTitle, this.newReview, this.newReviewRating).subscribe({
      next: (review) => {
        this.reviews.push(review);
        this.newReview = '';
        this.newReviewTitle = '';
        this.newReviewRating = 0;
        this.errorMessages = [];
        this.hasWrittenReview = true;
      },
      error: (error) => {
        this.errorMessages = error.error.errors || [error.error];
      }
    });
  }

  editReview(review: any): void {
    console.log('editReview: received review object:', review); // Debug log
    this.editingReviewId = review._id; // Assuming MongoDB's default ID field is _id
    this.editingReviewTitle = review.title;
    this.editingReviewContent = review.content;
    this.editingReviewRating = review.rating;
  }

  updateReview(): void {
    this.errorMessages = [];  // Clear previous error messages

    if (this.editingReviewId) {
      this.reviewService.updateReview(this.editingReviewId, this.user.id, this.editingReviewTitle, this.editingReviewContent, this.editingReviewRating).subscribe({
        next: (updatedReview) => {
          const index = this.reviews.findIndex((review) => review._id === this.editingReviewId);
          if (index !== -1) {
            this.reviews[index] = updatedReview;
          }
          this.cancelEditing();
          this.errorMessages = [];
        },
        error: (error) => {
          this.errorMessages = error.error.errors || [error.error];
        }
      });
    } else {
      console.log('updateReview: editingReviewId is null');
    }
  }

  cancelEditing(): void {
    this.editingReviewId = null;
    this.editingReviewTitle = '';
    this.editingReviewContent = '';
    this.editingReviewRating = 0;
  }

  removeReview(reviewId: string): void {
    this.errorMessages = [];  // Clear previous error messages

    this.reviewService.removeReview(reviewId, this.user.id).subscribe({
      next: () => {
        this.reviews = this.reviews.filter((review) => review._id !== reviewId);
        this.hasWrittenReview = false;
      },
      error: (error) => {
        this.errorMessages = error.error.errors || [error.error];
      }
    });
  }

  upvoteReview(reviewId: string): void {
    this.reviewService.upvoteReview(this.user.id, reviewId).subscribe({
      next: (response) => {
        const review = this.reviews.find((r) => r._id === reviewId);
        if (review) {
          review.hasUpvoted = true;
          review.upvotesCount = response.helpfulness; // Update with the correct count from the backend
        }
      },
      error: (error) => {
        this.errorMessages = error.error.errors || [error.error];
      }
    });
  }

  upvoteAllowed(review: any): boolean {
    if(review.hasUpvoted == true) return false;
    return review.user_id != this.user.id;
  }

  isReviewAuthor(review: any): boolean {
    return review.user_id === this.user.id;
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  setTempEditingRating(rating: number) {
    this.tempEditingRating = rating;
  }

  setEditingRating(rating: number) {
    this.editingReviewRating = rating;
  }

  resetEditingStars() {
    this.tempEditingRating = this.editingReviewRating;
  }

  setRating(rating: number) {
    this.newReviewRating = rating;
  }
  setTempRating(rating: number) {
    this.tempRating = rating;
  }

  resetStars() {
    this.tempRating = 0;
  }
}
