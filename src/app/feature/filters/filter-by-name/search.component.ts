import { Component, OnInit, ViewChild, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, skipWhile } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material';
import { SearchModel } from './model/search-model';
import { Movie } from '../../../model/movie';
import { MoviesStore } from '../../../model/movies-state/movies-store';
import { BaseFilterComponent } from '../base-filter.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent extends BaseFilterComponent implements OnInit {
  @Output() complete = new EventEmitter<any>();
  @Output() reset = new EventEmitter<any>();

  @ViewChild(MatAutocomplete)
  private autoCmplt: MatAutocomplete;

  @ViewChild('nameSearch', { read: MatAutocompleteTrigger })
  private autoCmpliteTrigger: MatAutocompleteTrigger;

  searchFormControl: FormControl = new FormControl();
  names: string[];
  model: SearchModel;
  movies: Movie[];

  constructor(private moviesStore: MoviesStore) {
    super();
    this.name = 'key';
  }

  ngOnInit() {
    this.model = new SearchModel();

    this.moviesStore.observe()
      .pipe(skipWhile(x => !x.container))
      .subscribe(state => {
        this.movies = state.container.movies;
        this.names = this.getNames(this.movies);
      });

    this.searchFormControl.valueChanges
      .pipe(
        startWith('')
      ).subscribe(criteria => {
        if (criteria) {
          this.criteria = criteria;
          this.names = this.filterNames(criteria, this.movies);
        } else {
          this.criteria = '';
          this.names = this.getNames(this.movies).slice();
          this.reset.emit({ name: this.name });
        }
      });

    this.autoCmplt.optionSelected
      .subscribe(token => {
        const criteria = token.option.value;
        this.search(criteria);
      });
  }

  search(criteria: string): void {
    if (criteria) {
      this.complete.emit({ name: this.name, criteria: criteria });
      this.autoCmpliteTrigger.closePanel();
    }
  }

  filterNames(criteria: string, movies: Movie[]) {
    return this.getNames(movies).filter(name => {
      if (name.toLowerCase().indexOf(criteria.toLowerCase()) > -1) {
        return name;
      }
    });
  }

  getNames(movies: Movie[]): string[] {
    return movies ? movies.map(x => x.key) : [];
  }

  clear(): void {
    this.criteria = '';
    this.searchFormControl.reset();
    this.reset.emit({ name: this.name });
  }
}
