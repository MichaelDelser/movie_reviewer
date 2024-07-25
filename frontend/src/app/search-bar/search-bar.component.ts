import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';
import {FormsModule} from "@angular/forms";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {MatCard, MatCardContent, MatCardImage} from "@angular/material/card";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon"; // Adjust the path as needed

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    DatePipe,
    NgIf,
    MatCardContent,
    MatCard,
    MatCardImage,
    MatButton,
    MatInput,
    MatIcon,
    MatLabel,
    MatFormField,
    MatIconButton
  ],
  styleUrls: ['./search-bar.component.scss']
})
/**
 * Component for searching movies and TV shows.
 * Handles search input and displays search results with pagination.
 */
export class SearchBarComponent {
  query: string = '';
  results: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;

  constructor(private movieService: MovieService, private router: Router) {}

  onSearch(): void {
    this.currentPage = 1; // Reset to the first page
    this.movieService.search(this.query).subscribe((results) => {
      this.results = results.results;
      this.movieService.filterBlacklistedItems(this.results).subscribe((filteredResults) => {
        this.results = filteredResults;
      });
    });
  }

  viewDetails(item: any): void {
    if (item.media_type === 'movie') {
      this.router.navigate(['/movie-details', item.id]);
    } else if (item.media_type === 'tv') {
      this.router.navigate(['/tv-show-details', item.id]);
    }
  }

  get paginatedResults(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.results.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < Math.ceil(this.results.length / this.itemsPerPage)) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  protected readonly Math = Math;
}
