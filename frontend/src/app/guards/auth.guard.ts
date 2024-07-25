import { Injectable } from '@angular/core'; // Import Injectable
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'; // Import Router modules
import { AuthService } from '../services/auth.service'; // Import AuthService

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // Check authentication
    if (this.authService.isAuthenticated()) {
      return true;
    }
    // Redirect to login
    this.router.navigate(['/login']);
    return false;
  }
}
