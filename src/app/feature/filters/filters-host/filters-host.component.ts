import { Movie } from 'src/app/model/movie';
import { Component, OnInit, Input, ViewChildren } from '@angular/core';
import { MoviesStore } from 'src/app/model/movies-state/movies-store';
import { MoviesSuccessEvent, MoviesResetEvent } from 'src/app/model/movies-state/movies-events';
import { GENRE_TYPE } from '../../../model/movie'

@Component({
  selector: 'app-filters-host',
  templateUrl: './filters-host.component.html',
  styleUrls: ['./filters-host.component.scss']
})
export class FiltersHostComponent implements OnInit {
  @Input() movies: Movie[];
  @ViewChildren('filter') filtersComponents: any;

  genres: string[] = [];
  firstFilterName = '';

  constructor(private moviesStore: MoviesStore) { }

  ngOnInit() {
    for (const key in GENRE_TYPE) {
      this.genres.push(key);
    }

    this.moviesStore.dispatch(new MoviesSuccessEvent(this.movies));
  }

  onSearchComplete(event: any): void {
    if (this.firstFilterName === '') {
      this.firstFilterName = event.name;
    }

    let items = [];

    const firstFilter = this.filtersComponents.find(c => c.name === this.firstFilterName);
    if (firstFilter) {
      items = firstFilter.model.apply(this.movies, firstFilter.criteria);
      this.filtersComponents
      .filter(fc => fc.name !== this.firstFilterName)
      .map(cmp => {
        const filterResult = cmp.model.apply(items, cmp.criteria);
        if (filterResult.length > 0) {
          items = filterResult;
        }
      });
    }

    this.moviesStore.dispatch(new MoviesSuccessEvent(items));
  }

  onResetFilter(): void {
    this.firstFilterName = '';
    this.moviesStore.dispatch(new MoviesResetEvent(this.movies));
  }

}
