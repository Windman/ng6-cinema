import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Movie } from '../../model/movie';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  @Input() movies: Movie[];

  constructor(public router: Router) {

  }

  ngOnInit() {

  }

  onMovieClick(movie: Movie): void {
    this.router.navigate(['/details', movie.id]);
  }
}
