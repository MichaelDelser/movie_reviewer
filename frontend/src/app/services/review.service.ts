import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = `${environment.apiUrl}/reviews`;

  constructor(private http: HttpClient) {}

  getReviews(contentType: string, contentId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${contentType}/${contentId}`);
  }

  addReview(userId: string, contentId: string, contentType: string, title: string, content: string, rating: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, { userId, itemId: contentId, itemType: contentType, title, content, rating });
  }

  updateReview(reviewId: string, userId: string, title: string, content: string, rating: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${reviewId}`, { userId, title, content, rating });
  }

  removeReview(reviewId: string, userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${reviewId}`, { body: { userId } });
  }

  upvoteReview(userId: string, reviewId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/upvote`, { userId, reviewId });
  }

  hasUpvoted(userId: string, reviewId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/hasUpvoted`, { userId, reviewId });
  }
}
