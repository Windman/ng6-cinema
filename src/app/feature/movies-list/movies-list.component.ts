import { MoviesStore } from './../../model/movies-state/movies-store';
import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { Movie } from '../../model/movie';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  movies: Movie[];

  constructor(public router: Router
    , private moviesStore: MoviesStore
    , private snackbarr: MatSnackBar) {

  }

  ngOnInit() {
    this.moviesStore.observe()
    .subscribe(state => {
      this.movies = state.container.movies;
      this.showMoviesLength(this.movies.length);
    });
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
