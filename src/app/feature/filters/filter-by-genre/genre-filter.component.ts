import { FormControl } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { GenreFilterModel } from './model/genre-filter-model';
import { MoviesStore } from '../../../model/movies-state/movies-store';
import { CriteriaType } from 'src/app/feature/filters/filter-types';

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
            const newgenre = p.concat.apply(p, k);
            const seen = {};
            return newgenre.filter(item => {
              return seen.hasOwnProperty(item) ? false : (seen[item] = true);
            }, []);
          });
      });

    this.genresForm.valueChanges
      .subscribe((genre: any) => {
        if (genre) {
          if (genre.length === 0) {
            this.reset.emit();
          } else {
            const criteria: CriteriaType = { name: 'bygenre', criteria: genre };
            this.complete.emit(criteria);
          }
        }
      });
  }

  clear(): void {
    this.genresForm.reset();
    this.reset.emit();
  }
}
