import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import {MatToolbar} from "@angular/material/toolbar";
import {MatAnchor} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatLabel} from "@angular/material/form-field"; // Adjust the path as needed

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    MatToolbar,
    MatAnchor,
    MatLabel,
    NgIf,
    RouterLink,
    RouterOutlet
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public authService: AuthService) {}

  getUsername(): string {
    console.log(this.authService.currentUserValue)
    return this.authService.currentUserValue?.user?.username || '';
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  logout() {
    this.authService.logout();
  }
}
