export interface BaseFilterModel {
  model: (item: any, key: string, criteria: any) => boolean;
}
