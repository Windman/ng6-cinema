import { GenreFilterModel } from './../filter-by-genre/model/genre-filter-model';
import { Movie } from 'src/app/model/movie';
import { Component, OnInit, Input, ViewChildren } from '@angular/core';
import { MoviesStore } from 'src/app/model/movies-state/movies-store';
import { MoviesSuccessEvent } from 'src/app/model/movies-state/movies-events';
import { GENRE_TYPE } from '../../../model/movie';
import { SearchModel } from '../filter-by-name/model/search-model';

@Component({
  selector: 'app-filters-host',
  templateUrl: './filters-host.component.html',
  styleUrls: ['./filters-host.component.scss']
})
export class FiltersHostComponent implements OnInit {
  @Input() movies: Movie[];
  @ViewChildren('filter') filtersComponents: any;

  genres: string[] = [];

  search: any = {};
  model: any = {};

  constructor(private moviesStore: MoviesStore) {}

  ngOnInit() {
    this.model['key'] = new SearchModel().model;
    this.model['genres'] = new GenreFilterModel().model;

    // tslint:disable-next-line:forin
    for (const key in GENRE_TYPE) {
      this.genres.push(key);
    }

    this.moviesStore.dispatch(new MoviesSuccessEvent(this.movies));
  }

  onSearchComplete(event: any): void {
    if (!event) {
      return;
    }

    const predicate = this.filter(event.name, event.criteria);
    const items = this.movies.filter(x => {
      return predicate(x);
    });
    this.moviesStore.dispatch(new MoviesSuccessEvent(items));
  }

  onResetFilter(event: any): void {
    if (!event) {
      return;
    }

    delete this.search[event.name];
    const predicate = this.filter(event.name, event.criteria);
    const items = this.movies.filter(x => {
      return predicate(x);
    });
    this.moviesStore.dispatch(new MoviesSuccessEvent(items));
  }

  filter(name: string, value: string) {
    this.search[name] = value;

    const predicate = Object.keys(this.search).reduce(
      (memo: (x: any) => boolean, key) => {
        const criteria = this.search[key];
        if (criteria) {
          return item => memo(item) && this.model[key](item, key, criteria);
        }

        return memo;
      },
      x => true
    );

    return predicate;
  }
}
