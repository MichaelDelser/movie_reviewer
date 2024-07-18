import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; // Adjust the path as needed
import { LogInComponent } from './log-in/log-in.component'; // Adjust the path as needed
import { SignUpComponent } from './sign-up/sign-up.component'; // Adjust the path as needed
import { MovieDetailsComponent } from './movie-details/movie-details.component'; // Adjust the path as needed
import { TvShowDetailsComponent } from './tv-show-details/tv-show-details.component'; // Adjust the path as needed
import { FavouritesComponent } from './favourites/favourites.component'; // Adjust the path as needed
import { WatchlistComponent } from './watchlist/watchlist.component'; // Adjust the path as needed

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LogInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'movie-details/:id', component: MovieDetailsComponent },
  { path: 'tv-show-details/:id', component: TvShowDetailsComponent },
  { path: ':username/favourites', component: FavouritesComponent },
  { path: ':username/watchlist', component: WatchlistComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];
