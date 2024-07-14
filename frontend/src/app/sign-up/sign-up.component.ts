// src/app/sign-up/sign-up.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  username: string = '';
  password: string = '';
  passwordConfirm: string = '';
  passwordMismatch: boolean = false;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  signUp() {
    this.passwordMismatch = this.password !== this.passwordConfirm;

    if (this.passwordMismatch) {
      this.errorMessage = null;
      return;
    }

    this.authService.signUp(this.username, this.password).subscribe(
      response => {
        this.authService.setToken(response.token, this.username);
        this.router.navigate(['/home']);
      },
      error => {
        this.errorMessage = error; // Assuming error is a string message from the server
      }
    );
  }
}
