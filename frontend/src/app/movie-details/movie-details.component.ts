import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import { ReviewService } from '../review.service';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movieId!: string;
  movie: any;
  reviews: any[] = [];
  newReview = { title: '', content: '', rating: 0 };
  stars: boolean[] = Array(10).fill(false); // 10 stars
  hoverIndex = -1;
  errorMessages: any = {};

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private reviewService: ReviewService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id')!;
    this.fetchMovieDetails();
    this.loadReviews();
  }

  fetchMovieDetails(): void {
    const movieIdNumber = +this.movieId; // Convert string to number
    this.movieService.getMovieDetails(movieIdNumber).subscribe(movie => {
      this.movie = movie;
    });
  }

  loadReviews(): void {
    this.reviewService.getReviews('Movie', this.movieId).subscribe(reviews => {
      this.reviews = reviews;
    });
  }

  addReview(): void {
    const reviewData = {
      user_id: this.authService.currentUserValue.id,
      content_id: this.movieId,
      content_type: 'Movie',
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
    this.hoverIndex = index + 1; // Change to include the hovered star
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
