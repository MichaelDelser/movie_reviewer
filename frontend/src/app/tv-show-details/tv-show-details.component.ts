import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import { WatchlistService } from '../watchlist.service';
import { FavouriteService } from '../favourite.service';
import { AuthService } from '../auth.service';
import {ReviewComponent} from "../review/review.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-tv-show-details',
  templateUrl: './tv-show-details.component.html',
  standalone: true,
  imports: [
    ReviewComponent,
    NgIf
  ],
  styleUrls: ['./tv-show-details.component.scss']
})
export class TvShowDetailsComponent implements OnInit {
  tvShow: any;
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
      this.movieService.getTvShowDetails(+id).subscribe(tvShow => {
        this.tvShow = tvShow;
        this.checkIfInWatchlist(userId, this.tvShow.id);
        this.checkIfInFavourites(userId, this.tvShow.id);
      });
    }
  }

  addToWatchlist(): void {
    const userId = this.authService.currentUserValue.id;
    this.watchlistService.addToWatchlist(userId, this.tvShow.id, 'tv').subscribe(() => {
      this.isInWatchlist = true;
    });
  }

  addToFavourites(): void {
    const userId = this.authService.currentUserValue.id;
    this.favouriteService.addToFavourites(userId, this.tvShow.id, 'tv').subscribe(() => {
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
