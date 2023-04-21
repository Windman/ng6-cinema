export class GenreFilterModel {
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
