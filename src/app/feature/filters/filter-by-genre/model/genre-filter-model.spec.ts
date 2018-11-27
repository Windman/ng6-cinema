import { GenreFilterModel } from "./genre-filter-model";
import { movies } from '../../../../../data/movie.mock-data';

describe('Gender filter model', () => {
  let model: GenreFilterModel;

  beforeEach(() => {
    model = new GenreFilterModel();
  });

  it('should filter movies by genres', () => {
    const genres = ['adventure'];
    expect(model.apply(movies, genres).length).toBe(7);
  });

  it('should return empty array no movies found by a genre', () => {
    const genres = ['default'];
    expect(model.apply(movies, genres).length).toBe(0);
  });

  it('should return empty array if genres is empty', () => {
    const genres = [];
    expect(model.apply(movies, genres).length).toBe(0);
  });

  it('should return empty array if genres is null', () => {
    const genres = null;
    expect(model.apply(movies, genres).length).toBe(0);
  });

});
