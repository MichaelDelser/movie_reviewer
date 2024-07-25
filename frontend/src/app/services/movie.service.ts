import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {map} from "rxjs/operators"; // Adjust the path as needed
import { AdminMoviesService } from './admin-movies.service';


@Injectable({
  providedIn: 'root'
})
/**
 * Service for movie-related operations.
 * Fetches movie details, search results, and other movie data.
 */
export class MovieService {
  private tmdbApiKey = environment.tmdbApiKey;
  private tmdbApiUrl = environment.tmdbApiUrl;

  constructor(private http: HttpClient, private adminMoviesService: AdminMoviesService) {}

  // TMDB multi-search (search movies, TV shows, and people)
  search(query: string): Observable<any> {
    return this.http.get<any>(`${this.tmdbApiUrl}/search/multi`, {
      params: {
        api_key: this.tmdbApiKey,
        query: query
      }
    });
  }

  filterBlacklistedItems(items: any[]): Observable<any[]> {
    const ids = items.map((item) => item.id);
    return this.adminMoviesService.getBlacklistedByIds(ids).pipe(
      map((blacklistedItems) => {
        return items.filter(
          (item) => !blacklistedItems.some((blacklistedItem) => blacklistedItem.tmdb_id === item.id)
        );
      })
    );
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
