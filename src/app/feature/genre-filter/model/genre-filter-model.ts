import { Movie } from "../../../model/movie";

export class GenreFilterModel {

  constructor(private movies: Movie[]) {

  }

  applyFilter(genres: string[]): Movie[] {
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
