import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TmdbService } from '../tmdb.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  tvShow: any;
  isMovie: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const path = this.route.snapshot.url[0].path;

    if (idParam) {
      const id = +idParam;

      if (path === 'movie') {
        this.isMovie = true;
        this.tmdbService.getMovieDetails(id).subscribe(data => {
          this.movie = data;
        });
      } else {
        this.isMovie = false;
        this.tmdbService.getTvDetails(id).subscribe(data => {
          this.tvShow = data;
        });
      }
    } else {
      // Handle the case where 'id' is not present in the route parameters
      console.error('ID parameter is missing in the route.');
    }
  }
}
