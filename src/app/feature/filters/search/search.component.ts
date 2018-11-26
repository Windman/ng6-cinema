import { Component, OnInit, ViewChild, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material';
import { SearchModel } from './model/search-model';
import { Movie } from '../../../model/movie';
import { MoviesStore } from '../../../model/movies-state/movies-store';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() complete = new EventEmitter<any>();
  @Output() reset = new EventEmitter();

  @ViewChild(MatAutocomplete)
  private autoCmplt: MatAutocomplete;

  @ViewChild('nameSearch', { read: MatAutocompleteTrigger })
  private autoCmpliteTrigger: MatAutocompleteTrigger;

  searchFormControl: FormControl = new FormControl();
  names: string[];
  model: SearchModel;
  movies: Movie[];

  constructor(private moviesStore: MoviesStore) {

  }

  ngOnInit() {
    this.moviesStore.observe()
      .subscribe(state => {
        this.movies = state.container.movies;
        this.names = this.getNames(this.movies);
      });

    this.searchFormControl.valueChanges
      .pipe(
        startWith('')
      ).subscribe(criteria => {
        if (criteria) {
          this.names = this.filterNames(criteria, this.movies);
        } else {
          this.names = this.getNames(this.movies).slice();
          this.reset.emit();
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
      this.complete.emit({ name: 'byname', criteria: criteria });
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
    this.searchFormControl.reset();
    this.reset.emit();
  }
}
