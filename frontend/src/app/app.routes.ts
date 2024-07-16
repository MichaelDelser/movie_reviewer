import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import {ProtectedComponent} from "./protected/protected.component";
import { AdminComponent } from './admin/admin.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { AuthGuard } from './auth.guard';
import {RoleGuard} from "./role.guard";
import {TvShowDetailsComponent} from "./tv-show-details/tv-show-details.component";
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { WatchlistComponent } from './watchlist/watchlist.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LogInComponent },
  { path: 'movie-details/:id', component: MovieDetailsComponent },
  { path: 'tv-show-details/:id', component: TvShowDetailsComponent },
  { path: ':username', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: ':username/favourites', component: FavouritesComponent, canActivate: [AuthGuard] },
  { path: ':username/watchlist', component: WatchlistComponent, canActivate: [AuthGuard] },
  { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['admin'] } }
];
