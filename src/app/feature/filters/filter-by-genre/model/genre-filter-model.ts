import { Movie } from "../../../../model/movie";
import { BaseFilterModel } from "../../base-filter.model";

export class GenreFilterModel implements BaseFilterModel {

  constructor(private movies: Movie[]) {

  }

  apply(genres: string[]): Movie[] {
    if (typeof genres === 'string') {
      return [];
    }

    const lookup = {};
    genres.forEach(g => {
      lookup[g] = 1;
    })
    return this.movies.filter(m => {
      const match = m.genres.filter(g => {
        return lookup[g] ? true : false;
        }).length === genres.length; //strict //not > 0
      return match;
      });
  }

}
