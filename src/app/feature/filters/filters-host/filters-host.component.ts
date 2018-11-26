import { Movie } from '../../../model/movie';
import { Component, OnInit, Input } from '@angular/core';
import { MoviesStore } from '../../../model/movies-state/movies-store';
import { MoviesSuccessEvent, MoviesResetEvent } from '../../../model/movies-state/movies-events';
import { GenreFilterModel } from '../filter-by-genre/model/genre-filter-model';
import { SearchModel } from '../filter-by-name/model/search-model';

@Component({
  selector: 'app-filters-host',
  templateUrl: './filters-host.component.html',
  styleUrls: ['./filters-host.component.scss']
})
export class FiltersHostComponent implements OnInit {
  @Input() movies: Movie[];

  filters = [];

  constructor(private moviesStore: MoviesStore) { }

  ngOnInit() {
    this.moviesStore.dispatch(new MoviesSuccessEvent(this.movies));

    this.filters.push(new GenreFilterModel(this.movies));
    this.filters.push(new SearchModel(this.movies));
  }

  onSearchComplete(event: any): void {
    let items = [];

    this.filters.forEach(f => {
      items = [].concat.apply(items, f.apply(event.criteria));
    });

    this.moviesStore.dispatch(new MoviesSuccessEvent(items));
  }

  onResetFilter(): void {
    this.moviesStore.dispatch(new MoviesResetEvent(this.movies));
  }

}
