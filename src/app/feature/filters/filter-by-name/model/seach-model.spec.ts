import { movies } from '../../../../../data/movie.mock-data';
import { SearchModel } from 'src/app/feature/filters/filter-by-name/model/search-model';

describe('Search  by a name filter model', () => {
  let model: SearchModel;

  beforeEach(() => {
    model = new SearchModel();
  });

  it('should filter movies by a name', () => {
    const criteria = 'deadpool';
    expect(model.apply(movies, criteria).length).toBe(1);
  });

  it('should filter movies by a criteria', () => {
    const criteria = 'd';
    expect(model.apply(movies, criteria).length).toBe(10);
  });

  it('should return empty array no movies found by a criteria', () => {
    const criteria = 'default';
    expect(model.apply(movies, criteria).length).toBe(0);
  });

  it('should return empty array if criteria is empty', () => {
    const criteria = '';
    expect(model.apply(movies, criteria).length).toBe(0);
  });

  it('should return empty array if criteria is null', () => {
    const criteria = null;
    expect(model.apply(movies, criteria).length).toBe(0);
  });
});
