import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service'; // Adjust the path as needed
import { WatchlistService } from '../services/watchlist.service'; // Adjust the path as needed
import { FavouriteService } from '../services/favourite.service'; // Adjust the path as needed
import { ReviewService } from '../services/review.service'; // Adjust the path as needed
import { AuthService } from '../services/auth.service';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms"; // Adjust the path as needed

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  standalone: true,
  imports: [
    NgIf,
    DatePipe,
    NgForOf,
    FormsModule
  ],
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  isInWatchlist: boolean = false;
  isInFavourites: boolean = false;
  reviews: any[] = [];
  newReview: string = '';
  newReviewTitle: string = '';
  newReviewRating: number = 1;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private watchlistService: WatchlistService,
    private favouriteService: FavouriteService,
    private reviewService: ReviewService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.movieService.getMovieDetails(+movieId).subscribe((data) => {
        this.movie = data;
        const user = this.authService.currentUserValue?.user;
        if (user) {
          this.watchlistService.isInWatchlist(user.id, movieId).subscribe((status) => {
            this.isInWatchlist = status;
          });
          this.favouriteService.isInFavourites(user.id, movieId).subscribe((status) => {
            this.isInFavourites = status;
          });
        }
      });
      this.reviewService.getReviews('Movie', movieId).subscribe((data) => {
        this.reviews = data;
      });
    }
  }

  addToWatchlist(): void {
    const user = this.authService.currentUserValue?.user;
    if (user && this.movie) {
      this.watchlistService.addToWatchlist(user.id, this.movie.id, 'Movie').subscribe(() => {
        this.isInWatchlist = true;
      });
    }
  }

  addToFavourites(): void {
    const user = this.authService.currentUserValue?.user;
    if (user && this.movie) {
      this.favouriteService.addToFavourites(user.id, this.movie.id, 'Movie').subscribe(() => {
        this.isInFavourites = true;
      });
    }
  }

  addReview(): void {
    const user = this.authService.currentUserValue?.user;
    if (user && this.movie && this.newReview.trim() && this.newReviewTitle.trim() && this.newReviewRating) {
      this.reviewService.addReview(user.id, this.movie.id, 'Movie', this.newReviewTitle, this.newReview, this.newReviewRating).subscribe((review) => {
        this.reviews.push(review);
        this.newReview = '';
        this.newReviewTitle = '';
        this.newReviewRating = 1;
      });
    }
  }

  removeReview(reviewId: string): void {
    this.reviewService.removeReview(reviewId).subscribe(() => {
      this.reviews = this.reviews.filter(review => review.id !== reviewId);
    });
  }
}
