import { FormControl } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Movie } from 'src/app/model/movie';
import { GenreFilterModel } from './model/genre-filter-model';
import { MoviesStore } from 'src/app/model/movies-state/movies-store';
import { MoviesResetEvent, MoviesSuccessEvent } from 'src/app/model/movies-state/movies-events';

@Component({
  selector: 'app-genre-filter',
  templateUrl: './genre-filter.component.html',
  styleUrls: ['./genre-filter.component.scss']
})
export class GenreFilterComponent implements OnInit {
  @Input() movies: Movie[];
  @Input() genres: string[];
  @Output() complete = new EventEmitter<Movie[]>();
  @Output() reset = new EventEmitter();

  genresForm = new FormControl();
  model: GenreFilterModel;

  constructor(private moviesStore: MoviesStore) { }

  ngOnInit() {
    this.model = new GenreFilterModel(this.movies);

    this.moviesStore.observe()
      .subscribe(state => {
        this.movies = state.container.movies;
        this.model = new GenreFilterModel(this.movies);
      });

    this.genresForm.valueChanges
      .subscribe((genre: any) => {
        if (genre) {
          if (genre.length === 0) {
            this.reset.emit();
          } else {
            this.complete.emit(this.model.applyFilter(genre));
            //this.moviesStore.dispatch(new MoviesSuccessEvent(this.model.applyFilter(genre)));
          }
        }
      });
  }

  clear(): void {
    this.genresForm.reset();
    this.reset.emit();
  }
}
