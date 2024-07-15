import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = environment.tmdbApiKey;
  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  searchMovies(query: string): Observable<any> {
    const params = new HttpParams().set('api_key', this.apiKey).set('query', query);
    return this.http.get(`${this.apiUrl}/search/movie`, { params });
  }

  getMovieDetails(id: number): Observable<any> {
    const params = new HttpParams().set('api_key', this.apiKey);
    return this.http.get(`${this.apiUrl}/movie/${id}`, { params });
  }

  getTvDetails(id: number): Observable<any> {
    const params = new HttpParams().set('api_key', this.apiKey);
    return this.http.get(`${this.apiUrl}/tv/${id}`, { params });
  }
}
