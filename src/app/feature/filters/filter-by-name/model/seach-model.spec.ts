import { movies } from '../../../../../data/movie.mock-data';
import { SearchModel } from 'src/app/feature/filters/filter-by-name/model/search-model';

describe('Search  by a name filter model', () => {
  let search: SearchModel;

  beforeEach(() => {
    search = new SearchModel();
  });

  it('should filter by a name', () => {
    const item = movies.find(i => i.id === 1);
    const criteria = 'deadpool';
    const itemKey = 'key';

    expect(search.model(item, itemKey, criteria)).toBeTruthy();
  });

});
