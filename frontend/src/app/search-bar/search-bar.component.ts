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
  results: any[] = [];

  constructor(private movieService: MovieService, private router: Router) {}

  onSearch(): void {
    if (this.query) {
      this.movieService.searchMoviesAndShows(this.query).subscribe((response: any) => {
        this.results = response.results;
      });
    }
  }

  viewDetails(item: any): void {
    if (item.media_type === 'movie') {
      this.router.navigate(['/movie-details', item.id]);
    } else if (item.media_type === 'tv') {
      this.router.navigate(['/tv-show-details', item.id]);
    }
  }
}
