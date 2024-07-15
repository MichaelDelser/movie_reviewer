import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  query: string = '';
  movies: any[] = [];

  constructor(private tmdbService: MovieService, private router: Router) {}

  onSearch(): void {
    if (this.query.trim() !== '') {
      this.tmdbService.searchMovies(this.query).subscribe((response: any) => {
        this.movies = response.results;
      });
    }
  }

  navigateToDetails(movieId: number): void {
    this.router.navigate(['/movie', movieId]);
  }
}
