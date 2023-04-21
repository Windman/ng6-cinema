
export class SearchModel {
  model = (item, key, criteria) => ('' + item[key.toLowerCase()]).toLowerCase().indexOf(criteria) >= 0;
}
