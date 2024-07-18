import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { AuthService } from '../services/auth.service';
import { WatchlistService } from '../services/watchlist.service';
import { FavouriteService } from '../services/favourite.service';
import {DatePipe, NgIf} from "@angular/common";
import {ReviewComponent} from "../review/review.component";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  standalone: true,
  imports: [
    NgIf,
    ReviewComponent,
    DatePipe
  ],
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  user: any;
  isInWatchlist = false;
  isInFavourites = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private authService: AuthService,
    private watchlistService: WatchlistService,
    private favouriteService: FavouriteService
  ) {
    this.user = this.authService.currentUserValue?.user;
  }

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.movieService.getMovieDetails(+movieId).subscribe((data) => {
        this.movie = data;
        if (this.user) {
          this.watchlistService.isInWatchlist(this.user.id, movieId).subscribe((status) => {
            this.isInWatchlist = status;
          });
          this.favouriteService.isInFavourites(this.user.id, movieId).subscribe((status) => {
            this.isInFavourites = status;
          });
        }
      });
    }
  }

  addToWatchlist(): void {
    if (this.user) {
      this.watchlistService.addToWatchlist(this.user.id, this.movie.id, 'Movie').subscribe(() => {
        this.isInWatchlist = true;
      });
    }
  }

  removeFromWatchlist(): void {
    if (this.user) {
      this.watchlistService.removeFromWatchlist(this.user.id, this.movie.id).subscribe(() => {
        this.isInWatchlist = false;
      });
    }
  }

  addToFavourites(): void {
    if (this.user) {
      this.favouriteService.addToFavourites(this.user.id, this.movie.id, 'Movie').subscribe(() => {
        this.isInFavourites = true;
      });
    }
  }

  removeFromFavourites(): void {
    if (this.user) {
      this.favouriteService.removeFromFavourites(this.user.id, this.movie.id).subscribe(() => {
        this.isInFavourites = false;
      });
    }
  }
}
