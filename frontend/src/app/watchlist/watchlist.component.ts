import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { WatchlistService } from '../services/watchlist.service'; // Adjust the path as needed
import { AuthService } from '../services/auth.service';
import {NgForOf} from "@angular/common"; // Adjust the path as needed
import { MovieService } from '../services/movie.service';


@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {
  watchlist: any[] = [];
  username: string = '';

  constructor(
    private route: ActivatedRoute,
    private watchlistService: WatchlistService,
    private authService: AuthService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const user = this.authService.currentUserValue;
    if (user) {
      this.username = user.username;
      this.watchlistService.getWatchlist(user.id).subscribe((data) => {
        this.movieService.filterBlacklistedItems(data).subscribe((filteredResults) => {
          this.watchlist = filteredResults;
        });
      });
    }
  }

  removeFromWatchlist(itemId: string): void {
    const user = this.authService.currentUserValue;
    if (user) {
      this.watchlistService.removeFromWatchlist(user.id, itemId).subscribe(() => {
        this.watchlist = this.watchlist.filter(item => item.itemId !== itemId);
      });
    }
  }
}
