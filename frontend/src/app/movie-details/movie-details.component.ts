import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { AuthService } from '../services/auth.service';
import { WatchlistService } from '../services/watchlist.service';
import { FavouriteService } from '../services/favourite.service';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {ReviewComponent} from "../review/review.component";
import {AdminMoviesService} from "../services/admin-movies.service";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  standalone: true,
  imports: [
    NgIf,
    ReviewComponent,
    DatePipe,
    NgForOf
  ],
  styleUrls: ['./movie-details.component.scss']
})
/**
 * Component for displaying movie details.
 * Includes movie information, actions (add/remove to favourites and watchlist),
 * and production companies and backdrops.
 */
export class MovieDetailsComponent implements OnInit {
  movie: any;
  user: any;
  isInWatchlist = false;
  isInFavourites = false;
  isInDatabase = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private authService: AuthService,
    private watchlistService: WatchlistService,
    private favouriteService: FavouriteService,
    private adminMoviesService : AdminMoviesService
  ) {
    this.user = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.checkLocalDatabase(movieId);
      if (this.user) {
        this.watchlistService.isInWatchlist(this.user.id, movieId).subscribe((status) => {
          this.isInWatchlist = status;
        });
        this.favouriteService.isInFavourites(this.user.id, movieId).subscribe((status) => {
          this.isInFavourites = status;
        });
      }
    }
  }

  isAuthenticated(): boolean {
    return !!this.authService.getToken();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  addMovieToDatabase(): void {
    if (this.movie) {
      const {id, ...mediaWithoutID} = this.movie;
      const media = {
        ...mediaWithoutID,
        tmdb_id: id,
        mediaType: 'movie'
      };
      this.adminMoviesService.addMedia(media).subscribe(() => {
        this.isInDatabase = true;
      });
    }
  }

  checkLocalDatabase(id: string): void {
    this.adminMoviesService.getMediaById(id).subscribe({
      next: (data) => {
        if (data) {
          this.movie = data;
          this.movie.id = this.movie.tmdb_id;
          this.isInDatabase = true;
        } else {
          this.movieService.getMovieDetails(+id).subscribe((data) => {
            this.movie = data;
          });
        }
      },
      error: () => this.movieService.getMovieDetails(+id).subscribe((data) => {
               this.movie = data;
             })
    });
  }

  deleteMovieFromDatabase(): void {
    if (this.movie) {
      this.adminMoviesService.deleteMedia(this.movie.id).subscribe(() => {
        this.isInDatabase = false;
      });
    }
  }

  addToWatchlist(): void {
    console.log(this.user)
    if (this.user) {
      console.log(this.user)
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

  getGenreNames(genres: any[]): string {
    return genres.map(genre => genre.name).join(', ');
  }
}
