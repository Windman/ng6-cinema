import { Movie } from '../model/movie';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { of } from 'rxjs/internal/observable/of';

import { movies } from '../../data/movie.mock-data';

@Injectable()
export class MoviesService {
  get movies$(): Observable<Movie[]> {
    return this.movies.asObservable();
  }

  private movies = new Subject<Movie[]>();

  constructor() {}

  getMovies(): Observable<Movie[]> {
    return of(movies.map(item => new Movie(item)));
  }

  getMovie(id: number): Observable<Movie> {
    return of(
      movies
        .filter(i => i.id === id)
        .map(item => {
          return new Movie(item);
        })
        .reduce((p, k) => {
          return k;
        }, null)
    );
  }
}
