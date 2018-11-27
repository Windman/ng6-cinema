import { Movie } from "src/app/model/movie";

export interface BaseFilterModel {
  apply(items: Movie[], criteria: any): any[];
}
