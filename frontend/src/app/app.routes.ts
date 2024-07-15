import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import {ProtectedComponent} from "./protected/protected.component";
import { AdminComponent } from './admin/admin.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { AuthGuard } from './auth.guard';
import {RoleGuard} from "./role.guard";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LogInComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'tv/:id', component: MovieDetailsComponent },
  { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['admin'] } }
];
