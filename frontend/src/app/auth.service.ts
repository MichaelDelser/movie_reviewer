import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private token: string | null = null;
  private username: string | null = null;

  constructor(private http: HttpClient) {}

  logIn(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { username, password })
      .pipe(
        catchError(this.handleError)
      );
  }

  signUp(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signup`, { username, password })
      .pipe(
        catchError(this.handleError)
      );
  }

  setToken(token: string, username: string): void {
    this.token = token;
    this.username = username;
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('token');
  }

  getUsername(): string | null {
    return this.username || localStorage.getItem('username');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.token = null;
    this.username = null;
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.error.errors) {
      // Validation error
      errorMessage = error.error.errors.map((err: any) => err.msg).join(', ');
    } else if (error.error.msg) {
      // Specific message from server
      errorMessage = error.error.msg;
    } else if (error.message) {
      // General error message
      errorMessage = `Error: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
