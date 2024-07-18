import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service'; // Adjust the path as needed
import { WatchlistService } from '../services/watchlist.service'; // Adjust the path as needed
import { FavouriteService } from '../services/favourite.service'; // Adjust the path as needed
import { ReviewService } from '../services/review.service'; // Adjust the path as needed
import { AuthService } from '../services/auth.service';
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {ReviewComponent} from "../review/review.component"; // Adjust the path as needed

@Component({
  selector: 'app-tv-show-details',
  templateUrl: './tv-show-details.component.html',
  standalone: true,
  imports: [
    NgIf,
    DatePipe,
    NgForOf,
    NgClass,
    ReviewComponent
  ],
  styleUrls: ['./tv-show-details.component.scss']
})
export class TvShowDetailsComponent implements OnInit {
  tvShow: any;
  isInWatchlist: boolean = false;
  isInFavourites: boolean = false;
  reviews: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private watchlistService: WatchlistService,
    private favouriteService: FavouriteService,
    private reviewService: ReviewService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const tvShowId = this.route.snapshot.paramMap.get('id');
    if (tvShowId) {
      this.movieService.getTvShowDetails(+tvShowId).subscribe((data) => {
        this.tvShow = data;
        const user = this.authService.currentUserValue?.user;
        if (user) {
          this.watchlistService.isInWatchlist(user.id, tvShowId).subscribe((status) => {
            this.isInWatchlist = status;
          });
          this.favouriteService.isInFavourites(user.id, tvShowId).subscribe((status) => {
            this.isInFavourites = status;
          });
        }
      });
      this.reviewService.getReviews('TVShow', tvShowId).subscribe((data) => {
        this.reviews = data;
      });
    }
  }

  addToWatchlist(): void {
    const user = this.authService.currentUserValue?.user;
    if (user && this.tvShow) {
      this.watchlistService.addToWatchlist(user.id, this.tvShow.id, 'TVShow').subscribe(() => {
        this.isInWatchlist = true;
      });
    }
  }

  addToFavourites(): void {
    const user = this.authService.currentUserValue?.user;
    if (user && this.tvShow) {
      this.favouriteService.addToFavourites(user.id, this.tvShow.id, 'TVShow').subscribe(() => {
        this.isInFavourites = true;
      });
    }
  }

  onReviewAdded(review: any): void {
    this.reviews.push(review);
  }

  removeReview(reviewId: string): void {
    this.reviewService.removeReview(reviewId).subscribe(() => {
      this.reviews = this.reviews.filter(review => review.id !== reviewId);
    });
  }
}
