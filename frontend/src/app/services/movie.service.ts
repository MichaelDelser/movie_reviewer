import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Adjust the path as needed

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private tmdbApiKey = environment.tmdbApiKey;
  private tmdbApiUrl = environment.tmdbApiUrl;

  constructor(private http: HttpClient) {}

  // TMDB multi-search (search movies, TV shows, and people)
  search(query: string): Observable<any> {
    return this.http.get<any>(`${this.tmdbApiUrl}/search/multi`, {
      params: {
        api_key: this.tmdbApiKey,
        query: query
      }
    });
  }

  // Get movie details from TMDB
  getMovieDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.tmdbApiUrl}/movie/${id}`, {
      params: {
        api_key: this.tmdbApiKey
      }
    });
  }

  // Get TV show details from TMDB
  getTvShowDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.tmdbApiUrl}/tv/${id}`, {
      params: {
        api_key: this.tmdbApiKey
      }
    });
  }
}
