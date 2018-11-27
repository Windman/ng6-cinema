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

  constructor(private moviesStore: MoviesStore) { }

  ngOnInit() {
    for (const key in GENRE_TYPE) {
      this.genres.push(key);
    }

    this.moviesStore.dispatch(new MoviesSuccessEvent(this.movies));
  }

  onSearchComplete(event: any): void {
    console.log(this.filtersComponents);
    let items = [];

    const firstFilter = this.filtersComponents.find(c => c.name === event.name);
    if (firstFilter) {
      items = firstFilter.model.apply(this.movies, event.criteria);
      this.filtersComponents
      .filter(fc => fc.name !== event.name)
      .map(cmp => { 
        items = [].concat.apply(items, cmp.model.apply(cmp.criteria));
      });
    }

    this.moviesStore.dispatch(new MoviesSuccessEvent(items));
  }

  onResetFilter(): void {
    this.moviesStore.dispatch(new MoviesResetEvent(this.movies));
  }

}
