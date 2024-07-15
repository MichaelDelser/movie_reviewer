import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addReview(reviewData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reviews/add`, reviewData);
  }

  getReviews(contentType: string, contentId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/reviews/${contentType}/${contentId}`);
  }

  upvoteReview(reviewId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/reviews/upvote/${reviewId}`, {});
  }
}
