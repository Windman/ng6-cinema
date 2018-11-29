import { GenreFilterModel } from "./genre-filter-model";
import { movies } from '../../../../../data/movie.mock-data';

describe('Gender filter model', () => {
  let genrefilter: GenreFilterModel;

  beforeEach(() => {
    genrefilter = new GenreFilterModel();
  });

  it('should filter movie by genre', () => {
    const item = movies.find(i => i.id === 1);
    const criteria = ['adventure'];
    const itemKey = 'genres';

    expect(genrefilter.model(item, itemKey, criteria)).toBeTruthy();
  });
});
