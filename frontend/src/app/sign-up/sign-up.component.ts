import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common"; // Adjust the path as needed

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    NgIf
  ],
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  username: string = '';
  password: string = '';
  passwordConfirm: string = '';
  passwordMismatch: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignUp(): void {
    if (this.password !== this.passwordConfirm) {
      this.passwordMismatch = true;
      return;
    }

    this.authService.signup(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: err => {
        this.errorMessage = err.error.message || 'An error occurred';
      }
    });
  }
}
