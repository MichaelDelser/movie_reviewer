import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {forkJoin, Observable, switchMap} from 'rxjs';
import { environment } from '../../environments/environment';
import {map} from "rxjs/operators";
import {MovieService} from "./movie.service"; // Adjust the path as needed

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private movieService: MovieService) {}

  addToFavourites(userId: string, itemId: string, itemType: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/favourites/add`, { userId, itemId, itemType });
  }

  isInFavourites(userId: string, itemId: string): Observable<boolean> {
    return this.http.get<any>(`${this.apiUrl}/favourites/check/${userId}/${itemId}`).pipe(
      map(response => response.exists)
    );
  }

  getFavourites(userId: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/favourites/${userId}`).pipe(
      switchMap(favourites => {
        const details$ = favourites.map(favourite =>
          favourite.itemType === 'movie'
            ? this.movieService.getMovieDetails(favourite.itemId)
            : this.movieService.getTvShowDetails(favourite.itemId)
        );
        return forkJoin(details$).pipe(
          map(details => favourites.map((favourite, index) => ({ ...favourite, ...details[index] })))
        );
      })
    );
  }

  removeFromFavourites(userId: string, itemId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/favourites/remove`, { body: { userId, itemId } });
  }
}
