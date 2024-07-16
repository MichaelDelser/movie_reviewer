import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { WatchlistService } from '../watchlist.service';
import { AuthService } from '../auth.service';
import {NgForOf} from "@angular/common";

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
  username!: string;

  constructor(
    private route: ActivatedRoute,
    private watchlistService: WatchlistService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username')!;
    const userId = this.authService.currentUserValue.id;
    this.watchlistService.getWatchlist(userId).subscribe(watchlist => {
      this.watchlist = watchlist;
    });
  }

  removeFromWatchlist(itemId: string): void {
    const userId = this.authService.currentUserValue.id;
    this.watchlistService.removeFromWatchlist(userId, itemId).subscribe(() => {
      this.watchlist = this.watchlist.filter(item => item.id !== itemId);
    });
  }
}
