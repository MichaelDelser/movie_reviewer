import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Adjust the path as needed

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getReviews(contentType: string, contentId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/reviews/${contentType}/${contentId}`);
  }

  addReview(userId: string, contentId: string, contentType: string, title: string, content: string, rating: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reviews/add`, { userId, contentId, contentType, title, content, rating });
  }

  removeReview(reviewId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/reviews/remove/${reviewId}`);
  }
}
