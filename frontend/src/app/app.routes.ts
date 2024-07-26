import { Routes } from '@angular/router'; // Import Routes
import { HomeComponent } from './home/home.component'; // Import HomeComponent
import { MovieDetailsComponent } from './movie-details/movie-details.component'; // Import MovieDetailsComponent
import { TvShowDetailsComponent } from './tv-show-details/tv-show-details.component'; // Import TVShowDetailsComponent
import { FavouritesComponent } from './favourites/favourites.component'; // Import FavouritesComponent
import { WatchlistComponent } from './watchlist/watchlist.component'; // Import WatchlistComponent
import { LogInComponent } from './log-in/log-in.component'; // Import LoginComponent
import { SignUpComponent } from './sign-up/sign-up.component'; // Import SignupComponent
import { AdminComponent } from './admin/admin.component'; // Import AdminComponent
import { AuthGuard } from './guards/auth.guard'; // Import AuthGuard
import { RoleGuard } from './guards/role.guard';
import {AdminUsersComponent} from "./admin-users/admin-users.component";
import {AdminMoviesComponent} from "./admin-movies/admin-movies.component";
import {AdminUserProfileComponent} from "./admin-user-profile/admin-user-profile.component"; // Import RoleGuard

export const routes: Routes = [
  // Home route
  { path: 'home', component: HomeComponent },
  // Movie details route
  { path: 'movie-details/:id', component: MovieDetailsComponent },
  // TV show details route
  { path: 'tv-show-details/:id', component: TvShowDetailsComponent },
  // Favourites route
  { path: ':username/favourites', component: FavouritesComponent, canActivate: [AuthGuard] },
  // Watchlist route
  { path: ':username/watchlist', component: WatchlistComponent, canActivate: [AuthGuard] },
  // Login route
  { path: 'login', component: LogInComponent },
  // Signup route
  { path: 'signup', component: SignUpComponent },
  // Admin route
  { path: 'admin', component: AdminComponent, canActivate: [RoleGuard] },
  // Admin users settings route
  { path: 'admin/users', component: AdminUsersComponent, canActivate: [RoleGuard] },
  // Admin user creation/edit route
  { path: 'admin/user-profile', component: AdminUserProfileComponent, canActivate: [RoleGuard] },
  // Admin movie settings route
  { path: 'admin/movies', component: AdminMoviesComponent, canActivate: [RoleGuard] },
  // Default route
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // Wildcard route
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
