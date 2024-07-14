// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './auth.service';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dropdownVisible = false;

  constructor(public authService: AuthService) {}

  getUsername(): string | null {
    return this.authService.getUsername();
  }

  logout() {
    this.authService.logout();
  }

  toggleDropdown(visible: boolean) {
    this.dropdownVisible = visible;
  }
}
