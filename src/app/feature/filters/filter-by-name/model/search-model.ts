import { Movie } from '../../../../model/movie';
import { BaseFilterModel } from '../../base-filter.model';

export class SearchModel implements BaseFilterModel {

  constructor() {

  }

  apply(movies: Movie[], criteria: string): Movie[] {
    if (!criteria || typeof criteria !== 'string') {
      return [];
    }
    return movies.filter(movie => new RegExp(criteria, 'gi').test(movie.key));
  }
}
