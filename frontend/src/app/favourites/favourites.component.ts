import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { FavouriteService } from '../services/favourite.service'; // Adjust the path as needed
import { AuthService } from '../services/auth.service';
import {NgForOf} from "@angular/common"; // Adjust the path as needed

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
  username: string = '';

  constructor(
    private route: ActivatedRoute,
    private favouriteService: FavouriteService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.currentUserValue?.user;
    if (user) {
      this.username = user.username;
      this.favouriteService.getFavourites(user.id).subscribe((data) => {
        this.favourites = data;
      });
    }
  }

  removeFromFavourites(itemId: string): void {
    const user = this.authService.currentUserValue?.user;
    if (user) {
      this.favouriteService.removeFromFavourites(user.id, itemId).subscribe(() => {
        this.favourites = this.favourites.filter(item => item.itemId !== itemId);
      });
    }
  }
}
