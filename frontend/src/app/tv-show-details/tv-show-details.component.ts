import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-tv-show-details',
  templateUrl: './tv-show-details.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  styleUrls: ['./tv-show-details.component.scss']
})
export class TvShowDetailsComponent implements OnInit {
  tvShow: any;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.movieService.getTvShowDetails(id).subscribe(tvShow => {
      this.tvShow = tvShow;
    });
  }
}
