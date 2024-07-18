import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {map} from "rxjs/operators"; // Adjust the path as needed

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addToWatchlist(userId: string, itemId: string, itemType: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/watchlist/add`, { userId, itemId, itemType });
  }

  isInWatchlist(userId: string, itemId: string): Observable<boolean> {
    return this.http.get<any>(`${this.apiUrl}/watchlist/check/${userId}/${itemId}`).pipe(
      map(response => response.exists)
    );
  }

  getWatchlist(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/watchlist/${userId}`);
  }

  removeFromWatchlist(userId: string, itemId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/watchlist/remove`, { body: { userId, itemId } });
  }
}
