import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';
import {FormsModule} from "@angular/forms";
import {DatePipe, NgForOf} from "@angular/common";
import {Router} from "@angular/router"; // Adjust the path as needed

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    DatePipe
  ],
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  query: string = '';
  results: any[] = [];

  constructor(private movieService: MovieService, private router: Router) {}

  onSearch(): void {
    this.movieService.search(this.query).subscribe((data: any) => {
      this.results = data.results;
    });
  }

  viewDetails(item: any): void {
    if (item.media_type === 'movie') {
      this.router.navigate(['/movie-details', item.id]);
    } else if (item.media_type === 'tv') {
      this.router.navigate(['/tv-show-details', item.id]);
    }
  }
}
