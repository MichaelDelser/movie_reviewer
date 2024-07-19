import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; // Adjust the path as needed
import { LogInComponent } from './log-in/log-in.component'; // Adjust the path as needed
import { SignUpComponent } from './sign-up/sign-up.component'; // Adjust the path as needed
import { MovieDetailsComponent } from './movie-details/movie-details.component'; // Adjust the path as needed
import { TvShowDetailsComponent } from './tv-show-details/tv-show-details.component'; // Adjust the path as needed
import { FavouritesComponent } from './favourites/favourites.component'; // Adjust the path as needed
import { WatchlistComponent } from './watchlist/watchlist.component';
import {AdminComponent} from "./admin/admin.component";
import {RoleGuard} from "./role.guard";
import {AdminUsersComponent} from "./admin-users/admin-users.component";
import {AdminUserProfileComponent} from "./admin-user-profile/admin-user-profile.component";
import {AdminMoviesComponent} from "./admin-movies/admin-movies.component"; // Adjust the path as needed

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LogInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'movie-details/:id', component: MovieDetailsComponent },
  { path: 'tv-show-details/:id', component: TvShowDetailsComponent },
  { path: ':username/favourites', component: FavouritesComponent },
  { path: ':username/watchlist', component: WatchlistComponent },
  { path: 'admin', component: AdminComponent, canActivate: [RoleGuard], data: { role: 'admin' } },
  { path: 'admin/users', component: AdminUsersComponent, canActivate: [RoleGuard], data: { role: 'admin' } },
  { path: 'admin/movies', component: AdminMoviesComponent, canActivate: [RoleGuard], data: { role: 'admin' } },
  { path: 'admin/user-profile', component: AdminUserProfileComponent, canActivate: [RoleGuard], data: { role: 'admin' } },
  { path: 'admin/user-profile/:id', component: AdminUserProfileComponent, canActivate: [RoleGuard], data: { role: 'admin' } },
  { path: '**', redirectTo: 'home' }
];
