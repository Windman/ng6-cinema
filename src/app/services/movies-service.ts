import { Movie } from '../model/movie';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

import { movies } from '../../data/movie.mock-data';

@Injectable()
export class MoviesService {

  constructor() {

  }

  getMovies(): Observable<Movie[]> {
    return of(movies.map(item => {
      return new Movie(item);
    }));
  }

  getMovie(id: number): Observable<Movie> {
    return of(movies.filter(i => i.id === id).map(item => {
      return new Movie(item);
    }).reduce((p, k) => {
      return k;
    }, new Movie()));
  }
}
