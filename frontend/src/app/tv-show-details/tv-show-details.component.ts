import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminMoviesService } from '../services/admin-movies.service';
import { MovieService } from '../services/movie.service';
import { AuthService } from '../services/auth.service';
import { WatchlistService } from '../services/watchlist.service';
import { FavouriteService } from '../services/favourite.service';
import {ReviewComponent} from "../review/review.component";
import {DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-tv-show-details',
  templateUrl: './tv-show-details.component.html',
  standalone: true,
  imports: [
    ReviewComponent,
    NgIf,
    DatePipe,
    NgForOf
  ],
  styleUrls: ['./tv-show-details.component.scss']
})
/**
 * Component for displaying TV show details.
 * Includes TV show information, actions (add/remove to favourites and watchlist),
 * and production companies and backdrops.
 */
export class TvShowDetailsComponent implements OnInit {
  tvShow: any;
  user: any;
  isInDatabase = false;
  isInWatchlist = false;
  isInFavourites = false;

  constructor(
    private route: ActivatedRoute,
    private adminMoviesService: AdminMoviesService,
    private movieService: MovieService,
    private authService: AuthService,
    private watchlistService: WatchlistService,
    private favouriteService: FavouriteService
  ) {
    this.user = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.checkLocalDatabase(id);
      this.user = this.authService.getCurrentUser()
      if (this.user) {
        this.watchlistService.isInWatchlist(this.user.id, id).subscribe((status) => {
          this.isInWatchlist = status;
        });
        this.favouriteService.isInFavourites(this.user.id, id).subscribe((status) => {
          this.isInFavourites = status;
        });
      }

    }

  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  getGenreNames(genres: any[]): string {
    return genres.map(genre => genre.name).join(', ');
  }

  checkLocalDatabase(id: string): void {
    this.adminMoviesService.getMediaById(id.toString()).subscribe({
      next: (data) => {
        if (data) {
          this.tvShow = data;
          this.tvShow.id = this.tvShow.tmdb_id;
          this.isInDatabase = true;
        } else {
          this.fetchTvShowFromTMDB(+id);
        }
      },
      error: () => this.fetchTvShowFromTMDB(+id)
    });
  }

  fetchTvShowFromTMDB(id: number): void {
    this.movieService.getTvShowDetails(id).subscribe({
      next: (tvShow) => this.tvShow = tvShow,
      error: (err) => console.error('Error fetching TV show from TMDB', err)
    });
  }

  addTvShowToDatabase(): void {
    if (this.tvShow) {
      const tvShowData = {
        ...this.tvShow,
        mediaType: 'tv',
        tmdb_id: this.tvShow.id
      };
      this.adminMoviesService.addMedia(tvShowData).subscribe(() => {
        this.isInDatabase = true;
      });
    }
  }

  deleteTvShowFromDatabase(): void {
    if (this.tvShow) {
      this.adminMoviesService.deleteMedia(this.tvShow.id).subscribe(() => {
        this.isInDatabase = false;
      });
    }
  }

  addToWatchlist(): void {
    const userId = this.authService.getCurrentUser().id;
    this.watchlistService.addToWatchlist(userId, this.tvShow.id, 'tv').subscribe(() => {
      this.isInWatchlist = true;
    });
  }

  removeFromWatchlist(): void {
    const userId = this.authService.getCurrentUser().id;
    this.watchlistService.removeFromWatchlist(userId, this.tvShow.id).subscribe(() => {
      this.isInWatchlist = false;
    });
  }

  addToFavourites(): void {
    const userId = this.authService.getCurrentUser().id;
    this.favouriteService.addToFavourites(userId, this.tvShow.id, 'tv').subscribe(() => {
      this.isInFavourites = true;
    });
  }

  removeFromFavourites(): void {
    const userId = this.authService.getCurrentUser().id;
    this.favouriteService.removeFromFavourites(userId, this.tvShow.id).subscribe(() => {
      this.isInFavourites = false;
    });
  }
}
