import { Movie } from "../../../../model/movie";
import { BaseFilterModel } from "src/app/feature/filters/base-filter.model";

export class GenreFilterModel implements BaseFilterModel {

  constructor() {

  }

  apply(movies: Movie[], genres: string[]): Movie[] {
    if (!genres || typeof genres === 'string') {
      return [];
    }

    const lookup = {};
    genres.forEach(g => {
      lookup[g] = 1;
    })
    return movies.filter(m => {
      const match = m.genres.filter(g => {
        return lookup[g] ? true : false;
        }).length === genres.length; //strict //not > 0
      return match;
      });
  }

}
