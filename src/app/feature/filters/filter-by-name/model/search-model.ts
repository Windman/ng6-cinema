import { BaseFilterModel } from '../../base-filter.model';

export class SearchModel implements BaseFilterModel {
  model = (item, key, criteria) => ('' + item[key.toLowerCase()]).toLowerCase().indexOf(criteria) >= 0;
}
