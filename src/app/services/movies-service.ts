import { movies } from './../../data/movie.mock-data';
import { Movie } from './../model/movie';
import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs/internal/Observable';
import { of } from '../../../node_modules/rxjs/internal/observable/of';

const data = require('../../data/movie.mock-data');

@Injectable()
export class MoviesService {

  constructor() {
    console.log(data);
  }

  getMovies(): Observable<Movie[]> {
    return of(data.movies.map(item => {
      return new Movie(item);
    }));
  }
}
