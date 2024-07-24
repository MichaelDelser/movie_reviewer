import { Component, OnInit } from '@angular/core';
import { AdminMoviesService } from '../services/admin-movies.service';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-admin-movies',
  templateUrl: './admin-movies.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  styleUrls: ['./admin-movies.component.scss']
})
export class AdminMoviesComponent implements OnInit {
  movies: any[] = [];
  sortOrder: { [key: string]: boolean } = { title: true, genre: true };

  constructor(private adminMoviesService: AdminMoviesService) {}

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies() {
    this.adminMoviesService.getAllMedia().subscribe((movies: any[]) => {
      this.movies = movies;
    });
  }

  sortMovies(property: string) {
    this.sortOrder[property] = !this.sortOrder[property];
    const direction = this.sortOrder[property] ? 1 : -1;
    this.movies.sort((a, b) => {
      if (a[property] < b[property]) {
        return -1 * direction;
      } else if (a[property] > b[property]) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
  }

  createMovie() : void {
    //logic to create movie
  }

  editMovie() {
    // Logic to edit movie
  }

  deleteMovie(movieId: string) {
    this.adminMoviesService.deleteMedia(movieId).subscribe(() => {
      this.fetchMovies();
    });
  }

  blacklistMovie(movie: any) {
    this.adminMoviesService.blacklistMedia(movie.tmdb_id).subscribe(() => {
      movie.isBlacklisted = ! movie.isBlacklisted
      this.fetchMovies();
    });
  }

  unblacklistMovie(movie: any) {
    this.adminMoviesService.unblacklistMedia(movie.tmdb_id).subscribe(() => {
      movie.isBlacklisted = ! movie.isBlacklisted
      this.fetchMovies();
    });
  }
}
