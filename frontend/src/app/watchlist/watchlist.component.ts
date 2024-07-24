import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { WatchlistService } from '../services/watchlist.service'; // Adjust the path as needed
import { AuthService } from '../services/auth.service';
import {NgClass, NgForOf, NgIf} from "@angular/common"; // Adjust the path as needed
import { MovieService } from '../services/movie.service';
import { FavouriteService } from "../services/favourite.service";
import {forkJoin} from "rxjs";
import {map} from "rxjs/operators";


@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    NgClass,
    NgIf
  ],
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {
  watchlistItems: any[] = [];
  filteredWatchlistItems: any[] = [];
  filter: string = 'movie';
  username: string = '';
  userId: string = '';
  isFavouriteMap: Map<string, boolean> = new Map();

  constructor(
    private route: ActivatedRoute,
    private watchlistService: WatchlistService,
    private authService: AuthService,
    private movieService: MovieService,
    private favouriteService: FavouriteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = this.authService.getCurrentUser().username;
    this.userId = this.authService.getCurrentUser().id;
    this.loadWatchlist();
  }

  loadWatchlist(): void {
    this.watchlistService.getWatchlist(this.userId).subscribe(items => {
      this.watchlistItems = items;
      this.filterWatchlist();
      this.checkFavourites();
    });
  }

  filterWatchlist(): void {
    this.filteredWatchlistItems = this.watchlistItems.filter(item => item.itemType === this.filter);
  }

  checkFavourites(): void {
    const requests = this.filteredWatchlistItems.map(item =>
        this.favouriteService.isInFavourites(this.userId, item.itemId).pipe(
            map(isFavourite => ({ itemId: item.itemId, isFavourite }))
        )
    );
    forkJoin(requests).subscribe(results => {
      results.forEach(result => this.isFavouriteMap.set(result.itemId, result.isFavourite));
    });
  }

  filterType(type: string): void {
    this.filter = type;
    this.filterWatchlist();
    this.checkFavourites();
  }

  isFavourite(itemId: string): boolean {
    return this.isFavouriteMap.get(itemId) || false;
  }

  getCount(type: string): number {
    return this.watchlistItems.filter(item => item.itemType === type).length;
  }

  removeFromWatchlist(itemId: string): void {
    const user = this.authService.currentUserValue;
    if (user) {
      this.watchlistService.removeFromWatchlist(this.userId, itemId).subscribe(() => {
        this.loadWatchlist();
      });
    }
  }

  addToFavourites(itemId: string, itemType: string): void {
    const user = this.authService.currentUserValue;
    if (user) {
      this.favouriteService.addToFavourites(user.id, itemId, itemType).subscribe(() => {
      });
    }
  }

  removeFromFavourites(itemId: any): void {
    const user = this.authService.currentUserValue;
    if (user) {
      this.favouriteService.removeFromFavourites(user.id, itemId).subscribe(() => {
      });
      this.reloadPage();
    }
  }

  reloadPage(): void {
      this.router.navigate(['/' + this.authService.getCurrentUser().username + '/watchlist']);
  }
}
