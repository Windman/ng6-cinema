import { FormControl } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Movie } from '../../../model/movie';
import { GenreFilterModel } from './model/genre-filter-model';
import { MoviesStore } from '../../../model/movies-state/movies-store';

@Component({
  selector: 'app-genre-filter',
  templateUrl: './genre-filter.component.html',
  styleUrls: ['./genre-filter.component.scss']
})
export class GenreFilterComponent implements OnInit {
  @Output() complete = new EventEmitter<any>();
  @Output() reset = new EventEmitter();

  genresForm = new FormControl();
  model: GenreFilterModel;
  genres: string[];

  constructor(private moviesStore: MoviesStore) { }

  ngOnInit() {
    this.moviesStore.observe()
      .subscribe(state => {
        const movies = state.container.movies;
        this.genres = movies
        .map(movie => movie.genres)
        .reduce((p, k) => {
          return p.concat(k);
        });
      });

    this.genresForm.valueChanges
      .subscribe((genre: any) => {
        if (genre) {
          if (genre.length === 0) {
            this.reset.emit();
          } else {
            this.complete.emit({ name: 'bygenre', criteria: genre });
          }
        }
      });
  }

  clear(): void {
    this.genresForm.reset();
    this.reset.emit();
  }
}
