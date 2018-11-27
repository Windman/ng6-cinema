import { MoviesStore } from '../../model/movies-state/movies-store';
import { MatSnackBar } from '@angular/material';
import { Component, Input, OnInit, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { Movie } from '../../model/movie';
import { skipWhile } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit, OnChanges {
  @Input() movies: Movie[];

  constructor(public router: Router,
    private snackbarr: MatSnackBar,
    private moviesStore: MoviesStore) {
  }

  ngOnInit() {
    this.moviesStore.observe()
      .pipe(skipWhile(x => !x.container))
      .subscribe(state => {
        this.movies = state.container.movies;
        this.showMoviesLength(this.movies.length);
      });

    this.showMoviesLength(this.movies.length);
  }

  ngOnChanges() {
    this.showMoviesLength(this.movies.length);
  }

  onMovieClick(movie: Movie): void {
    this.router.navigate(['/details', movie.id]);
  }

  private showMoviesLength(length: number): void {
    setTimeout(() => {
      this.snackbarr.open(`Showing ${length} movies`, ' DISMISS ', { duration: 3000 });
    }, 200);
  }
}
