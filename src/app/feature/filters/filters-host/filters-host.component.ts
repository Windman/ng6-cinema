import { Movie } from 'src/app/model/movie';
import { Component, OnInit, Input } from '@angular/core';
import { MoviesStore } from 'src/app/model/movies-state/movies-store';
import { MoviesSuccessEvent, MoviesResetEvent } from 'src/app/model/movies-state/movies-events';
import { GenreFilterModel } from 'src/app/feature/filters/genre-filter/model/genre-filter-model';
import { SearchModel } from 'src/app/feature/filters/search/model/search-model';
import { BaseFilterModel } from 'src/app/feature/filters/base-filter.model';

@Component({
  selector: 'app-filters-host',
  templateUrl: './filters-host.component.html',
  styles: ['./filters-host.component.scss']
})
export class FiltersHostComponent implements OnInit {
  @Input() movies: Movie[];

  filters = {};

  constructor(private moviesStore: MoviesStore) { }

  ngOnInit() {
    this.moviesStore.dispatch(new MoviesSuccessEvent(this.movies));

    this.filters["bygenre"] = new GenreFilterModel(this.movies);
    this.filters["byname"] = new SearchModel(this.movies);
  }

  onSearchComplete(event: any): void {
    let res = [];
    if (this.filters[event.name]) {
      res = res.concat.apply(res, this.filters[event.name].apply(event.criteria));
    }
    this.moviesStore.dispatch(new MoviesSuccessEvent(res));
  }

  onResetFilter(): void {
    this.moviesStore.dispatch(new MoviesResetEvent(this.movies));
  }

}
