import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { environment } from '../environments/environment';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private apiUrl = environment.apiUrl;
  private tmdbApiUrl = 'https://api.themoviedb.org/3';
  private apiKey = environment.tmdbApiKey;

  constructor(private http: HttpClient) {}

  getWatchlist(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/watchlist/${userId}`).pipe(
      mergeMap(items => {
        const requests = items.map(item =>
          this.http.get(`${this.tmdbApiUrl}/${item.itemType}/${item.itemId}?api_key=${this.apiKey}`)
            .pipe(map(response => ({ ...response, media_type: item.itemType })))
        );
        return forkJoin(requests);
      })
    );
  }

  addToWatchlist(userId: string, itemId: string, itemType: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/watchlist/add`, { userId, itemId, itemType });
  }

  removeFromWatchlist(userId: string, itemId: string): Observable<any> {
    return this.http.request('delete', `${this.apiUrl}/watchlist/remove`, { body: { userId, itemId } });
  }

  isInWatchlist(userId: string, itemId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/watchlist/check/${userId}/${itemId}`);
  }
}
