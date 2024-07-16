import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { environment } from '../environments/environment';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  private apiUrl = environment.apiUrl;
  private tmdbApiUrl = 'https://api.themoviedb.org/3';
  private apiKey = environment.tmdbApiKey;

  constructor(private http: HttpClient) {}

  getFavourites(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/favourites/${userId}`).pipe(
      mergeMap(items => {
        const requests = items.map(item =>
          this.http.get(`${this.tmdbApiUrl}/${item.itemType}/${item.itemId}?api_key=${this.apiKey}`)
            .pipe(map(response => ({ ...response, media_type: item.itemType })))
        );
        return forkJoin(requests);
      })
    );
  }

  addToFavourites(userId: string, itemId: string, itemType: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/favourites/add`, { userId, itemId, itemType });
  }

  removeFromFavourites(userId: string, itemId: string): Observable<any> {
    return this.http.request('delete', `${this.apiUrl}/favourites/remove`, { body: { userId, itemId } });
  }

  isInFavourites(userId: string, itemId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/favourites/check/${userId}/${itemId}`);
  }
}
