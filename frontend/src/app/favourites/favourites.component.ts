import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { FavouriteService } from '../favourite.service';
import { AuthService } from '../auth.service';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
  favourites: any[] = [];
  username!: string;

  constructor(
    private route: ActivatedRoute,
    private favouriteService: FavouriteService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username')!;
    const userId = this.authService.currentUserValue.id;
    this.favouriteService.getFavourites(userId).subscribe(favourites => {
      this.favourites = favourites;
    });
  }

  removeFromFavourites(itemId: string): void {
    const userId = this.authService.currentUserValue.id;
    this.favouriteService.removeFromFavourites(userId, itemId).subscribe(() => {
      this.favourites = this.favourites.filter(item => item.id !== itemId);
    });
  }
}
