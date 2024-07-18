import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {map} from "rxjs/operators"; // Adjust the path as needed

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addToFavourites(userId: string, itemId: string, itemType: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/favourites/add`, { userId, itemId, itemType });
  }

  isInFavourites(userId: string, itemId: string): Observable<boolean> {
    return this.http.get<any>(`${this.apiUrl}/favourites/check/${userId}/${itemId}`).pipe(
      map(response => response.exists)
    );
  }

  getFavourites(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/favourites/${userId}`);
  }

  removeFromFavourites(userId: string, itemId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/favourites/remove`, { body: { userId, itemId } });
  }
}
