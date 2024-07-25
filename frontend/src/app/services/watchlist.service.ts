import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {forkJoin, Observable, switchMap} from 'rxjs';
import { environment } from '../../environments/environment';
import {map} from "rxjs/operators";
import {MovieService} from "./movie.service"; // Adjust the path as needed

@Injectable({
  providedIn: 'root'
})
/**
 * Service for managing watchlist.
 * Handles adding, removing, and fetching items in the user's watchlist.
 */
export class WatchlistService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private movieService: MovieService) {}

  addToWatchlist(userId: string, itemId: string, itemType: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/watchlist/add`, { userId, itemId, itemType });
  }

  isInWatchlist(userId: string, itemId: string): Observable<boolean> {
    return this.http.get<any>(`${this.apiUrl}/watchlist/check/${userId}/${itemId}`).pipe(
      map(response => response.exists)
    );
  }

  getWatchlist(userId: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/watchlist/${userId}`).pipe(
      switchMap(watchlist => {
        const details$ = watchlist.map(item =>
          item.itemType === 'movie'
            ? this.movieService.getMovieDetails(item.itemId)
            : this.movieService.getTvShowDetails(item.itemId)
        );
        return forkJoin(details$).pipe(
          map(details => watchlist.map((item, index) => ({ ...item, ...details[index] })))
        );
      })
    );
  }

  removeFromWatchlist(userId: string, itemId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/watchlist/remove`, { body: { userId, itemId } });
  }
}
