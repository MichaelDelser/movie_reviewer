// src/app/services/tmdb.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private apiKey = '27b4f09f3b159cbcf7c657d03906af83';
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  searchMovies(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/movie`, {
      params: {
        api_key: this.apiKey,
        query: query
      }
    });
  }
}
