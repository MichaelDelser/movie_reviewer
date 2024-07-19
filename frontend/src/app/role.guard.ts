import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const expectedRole = route.data['role'];
    const token = localStorage.getItem('currentUser');
    const user = token ? JSON.parse(token).user : null;

    if (user && user.role === expectedRole) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
