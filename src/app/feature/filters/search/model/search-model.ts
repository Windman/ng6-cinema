import { Movie } from '../../../../model/movie';
import { BaseFilterModel } from 'src/app/feature/filters/base-filter.model';

export class SearchModel implements BaseFilterModel {

  constructor(private movies: Movie[] = []) {

  }

  apply(criteria: string): Movie[] {
    return this.movies.filter(movie => new RegExp(criteria, 'gi').test(movie.key));
  }
}
