import { Component, OnInit, ViewChild, Output, Input, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material';
import { SearchModel } from './model/search-model';
import { Movie } from '../../model/movie';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  @Input() movies: Movie[];
  @Output() complete = new EventEmitter<Movie[]>();
  @Output() reset = new EventEmitter();

  @ViewChild(MatAutocomplete)
  private autoCmplt: MatAutocomplete;

  @ViewChild('nameSearch', { read: MatAutocompleteTrigger })
  private autoCmpliteTrigger: MatAutocompleteTrigger;

  searchFormControl: FormControl = new FormControl();
  names: string[];
  model: SearchModel;

  constructor() {

  }

  ngOnInit() {
    this.model = new SearchModel(this.movies);
    this.names = this.model.names;

    this.searchFormControl.valueChanges
      .pipe(
        startWith('')
      ).subscribe(criteria => {
        if (criteria) {
          this.names = this.model.filterNames(criteria);
        } else {
          this.names = this.model.names.slice();
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

      this.complete.emit(
        this.model.filterMovies(criteria)
      );

      this.autoCmpliteTrigger.closePanel();
    }
  }

  clear(): void {
    this.searchFormControl.reset();
    this.reset.emit();
  }
}
