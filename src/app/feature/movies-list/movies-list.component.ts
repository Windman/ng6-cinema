import { MatSnackBar } from '@angular/material';
import { Component, Input, OnInit, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { Movie } from '../../model/movie';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit, OnChanges {
  @Input() movies: Movie[];

  constructor(public router: Router, private snackbarr: MatSnackBar) {

  }

  ngOnInit() {

  }

  ngOnChanges() {
    this.showMoviesLength(this.movies.length);
  }

  onMovieClick(movie: Movie): void {
    this.router.navigate(['/details', movie.id]);
  }

  private showMoviesLength(length: number): void {
    setTimeout(() => {
      this.snackbarr.open(`Showing ${length} movies`, ' DISMISS ', { duration: 1500 });
    }, 200);
  }
}
