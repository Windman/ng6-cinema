import { Movie } from '../../../model/movie';
import { Observable, of } from 'rxjs';

export class SearchModel {

  get names(): string[] {
    return this.movies ? this.movies.map(x => x.key) : [];
  }

  constructor(private movies: Movie[] = []) {

  }

  filterNames(criteria: string) {
    return this.names.filter(name => {
      if (name.toLowerCase().indexOf(criteria.toLowerCase()) > -1) {
        return name;
      }
    });
  }

  filterMovies(criteria: string): Movie[] {
    return this.movies.filter(movie => new RegExp(criteria, 'gi').test(movie.key));
  }
}
