export type FilterType = 'bygenre' | 'byname';

export interface CriteriaType {
  name: FilterType;
  criteria: any;
}
