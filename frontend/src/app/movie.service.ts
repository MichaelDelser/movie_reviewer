import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = environment.tmdbApiKey;
  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  searchMoviesAndShows(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/multi?api_key=${this.apiKey}&query=${query}`);
  }

  getMovieDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}?api_key=${this.apiKey}`);
  }

  getTvShowDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/tv/${id}?api_key=${this.apiKey}`);
  }
}
