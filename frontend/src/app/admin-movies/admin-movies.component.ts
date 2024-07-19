import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-admin-movies',
  templateUrl: './admin-movies.component.html',
  standalone: true,
  imports: [
    NgForOf
  ],
  styleUrls: ['./admin-movies.component.scss']
})
export class AdminMoviesComponent implements OnInit {
  movies: any[] = [];
  sortOrder: { [key: string]: boolean } = { title: true, genre: true };

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies() {
    this.adminService.getMovies().subscribe((movies: any[]) => {
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

  editMovie() {
    // Logic to edit movie
  }

  deleteMovie(movieId: string) {
    this.adminService.deleteMovie(movieId).subscribe(() => {
      this.fetchMovies();
    });
  }
}
