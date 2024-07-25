import { Injectable } from '@angular/core'; // Import Injectable
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'; // Import HTTP modules
import { Observable } from 'rxjs'; // Import Observable
import { AuthService } from '../services/auth.service'; // Import AuthService

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get token
    const authToken = this.authService.getToken();
    // Clone request
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${authToken}` }
    });
    // Handle request
    return next.handle(authReq);
  }
}
