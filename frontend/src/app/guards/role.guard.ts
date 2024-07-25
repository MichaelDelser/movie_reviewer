import { Injectable } from '@angular/core'; // Import Injectable
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'; // Import Router modules
import { AuthService } from '../services/auth.service'; // Import AuthService

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // Check admin role
    if (this.authService.isAdmin()) {
      return true;
    }
    // Redirect to home
    this.router.navigate(['/home']);
    return false;
  }
}
