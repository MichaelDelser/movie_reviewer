import { Component } from '@angular/core'; // Import Component
import { AuthService } from './services/auth.service';
import {MatToolbar} from "@angular/material/toolbar";
import {MatAnchor} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {Router, RouterLink, RouterOutlet} from "@angular/router"; // Import AuthService

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    MatToolbar,
    MatAnchor,
    NgIf,
    RouterLink,
    RouterOutlet
  ],
  styleUrls: ['./app.component.scss']
})
/**
 * Root component of the application.
 * Manages the main layout and routing.
 * Handles user authentication and navigation.
 */
export class AppComponent {
  title = 'movie-app'; // App title

  constructor(protected authService: AuthService, private router: Router) { }

  // Get username
  getUsername() {
    return this.authService.getCurrentUser().username;
  }

  // Check if admin
  isAdmin() {
    return this.authService.isAdmin();
  }

  // Logout user
  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
