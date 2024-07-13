// src/app/search-bar/search-bar.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TmdbService } from '../tmdb.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  query: string = '';
  movies: any[] = [];

  constructor(private tmdbService: TmdbService) { }

  onSearch() {
    if (this.query.trim()) {
      this.tmdbService.searchMovies(this.query).subscribe((data: any) => {
        this.movies = data.results;
      });
    }
  }
}
