import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { FavouriteService } from '../services/favourite.service'; // Adjust the path as needed
import { AuthService } from '../services/auth.service';
import {NgForOf, NgIf} from "@angular/common"; // Adjust the path as needed
import { MovieService } from '../services/movie.service';


@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    NgIf
  ],
  styleUrls: ['./favourites.component.scss']
})
/**
 * Component for managing user's favourites.
 * Displays favourite movies and TV shows.
 * Allows removal of items from favourites.
 */
export class FavouritesComponent implements OnInit {
  favourites: any[] = [];
  username: string = '';

  constructor(
    private route: ActivatedRoute,
    private favouriteService: FavouriteService,
    private authService: AuthService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const user = this.authService.currentUserValue;
    if (user) {
      this.username = user.username;
      this.favouriteService.getFavourites(user.id).subscribe((data) => {
        this.movieService.filterBlacklistedItems(data).subscribe((filteredResults) => {
          this.favourites = filteredResults;
        });
      });
    }
  }

  removeFromFavourites(itemId: string): void {
    const user = this.authService.currentUserValue;
    if (user) {
      this.favouriteService.removeFromFavourites(user.id, itemId).subscribe(() => {
        this.favourites = this.favourites.filter(item => item.itemId !== itemId);
      });
    }
  }
}
