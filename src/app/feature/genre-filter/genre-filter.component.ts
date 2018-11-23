import { FormControl } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Movie } from 'src/app/model/movie';
import { GenreFilterModel } from './model/genre-filter-model';

@Component({
  selector: 'app-genre-filter',
  templateUrl: './genre-filter.component.html',
  styleUrls: ['./genre-filter.component.scss']
})
export class GenreFilterComponent implements OnInit {
  @Input() genres: string[];
  @Input() movies: Movie[];
  @Output() complete = new EventEmitter<Movie[]>();
  @Output() reset = new EventEmitter();

  genresForm = new FormControl();

  constructor() { }

  ngOnInit() {
    const model = new GenreFilterModel(this.movies);

    this.genresForm.valueChanges
      .subscribe((genre: any) => {
        if (genre.length === 0) {
          this.reset.emit();
        } else {
          this.complete.emit(model.applyFilter(genre));
        }
      });
  }

}
