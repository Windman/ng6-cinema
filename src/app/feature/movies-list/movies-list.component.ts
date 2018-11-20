import { Component, Input } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';

import { Movie } from '../../model/movie';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent {
  @Input() movies: Movie[];

  constructor(private router: Router) {

  }

  onMovieClick(movie: Movie): void {
    this.router.navigate(['/details', movie.id]);
  }
}
