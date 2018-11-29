import { BaseFilterModel } from "../../base-filter.model";

export class GenreFilterModel implements BaseFilterModel {
  model = (item, key, criteria) => {
    const lookup = {};
    criteria.forEach(g => {
      lookup[g] = 1;
    })
    return item[key].filter(genre => {
      return lookup[genre] ? true : false;
        }).length === criteria.length;
  };
}

/*
apply(movies: Movie[], genres: string[]): Movie[] {

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
*/
