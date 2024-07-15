import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class LogInComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  logIn(): void {
    this.authService.logIn(this.username, this.password).subscribe(
      () => {
        this.router.navigate(['/home']);
      },
      (error: HttpErrorResponse) => {
        if (error.error.errors) {
          this.errorMessage = error.error.errors.map((err: any) => err.msg).join(' ');
        } else {
          this.errorMessage = error.error.msg;
        }
      }
    );
  }
}
