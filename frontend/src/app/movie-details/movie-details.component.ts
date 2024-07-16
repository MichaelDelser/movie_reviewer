import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import { WatchlistService } from '../watchlist.service';
import { FavouriteService } from '../favourite.service';
import { AuthService } from '../auth.service';
import {ReviewComponent} from "../review/review.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  standalone: true,
  imports: [
    ReviewComponent,
    NgIf
  ],
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  isInWatchlist: boolean = false;
  isInFavourites: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private watchlistService: WatchlistService,
    private favouriteService: FavouriteService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const userId = this.authService.currentUserValue.id;
    if (id) {
      this.movieService.getMovieDetails(+id).subscribe(movie => {
        this.movie = movie;
        this.checkIfInWatchlist(userId, this.movie.id);
        this.checkIfInFavourites(userId, this.movie.id);
      });
    }
  }

  addToWatchlist(): void {
    const userId = this.authService.currentUserValue.id;
    this.watchlistService.addToWatchlist(userId, this.movie.id, 'movie').subscribe(() => {
      this.isInWatchlist = true;
    });
  }

  addToFavourites(): void {
    const userId = this.authService.currentUserValue.id;
    this.favouriteService.addToFavourites(userId, this.movie.id, 'movie').subscribe(() => {
      this.isInFavourites = true;
    });
  }

  checkIfInWatchlist(userId: string, itemId: string): void {
    this.watchlistService.isInWatchlist(userId, itemId).subscribe(response => {
      this.isInWatchlist = response.exists;
    });
  }

  checkIfInFavourites(userId: string, itemId: string): void {
    this.favouriteService.isInFavourites(userId, itemId).subscribe(response => {
      this.isInFavourites = response.exists;
    });
  }
}
