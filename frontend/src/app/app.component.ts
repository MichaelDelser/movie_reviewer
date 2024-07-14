// src/app/app.component.ts
import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './auth.service';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    NgIf,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dropdownVisible = false;

  constructor(public authService: AuthService, private router : Router) {}

  getUsername(): string | null {
    return this.authService.getUsername();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  toggleDropdown(visible: boolean) {
    this.dropdownVisible = visible;
  }
}
