import { MoviesSuccessEvent } from './../../model/movies-state/movies-events';
import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../../base.component';
import { MoviesService } from '../../services/movies-service';
import { Movie } from '../../model/movie';
import { GENRE_TYPE } from '../../model/movie';
import { MoviesStore } from 'src/app/model/movies-state/movies-store';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.scss']
})
export class CinemaComponent extends BaseComponent implements OnInit {
  movies: Movie[];
  genres: string[] = [];

  constructor(private moviesService: MoviesService,
    private moviesStore: MoviesStore) {
    super();
  }

  ngOnInit() {
    this.moviesService.movies$
    .pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(movies => {
      this.movies = movies;
      //this.moviesStore.dispatch(new MoviesSuccessEvent(movies));
    });

    this.moviesService.getMovies();

    for (const key in GENRE_TYPE) {
      this.genres.push(key);
    }
  }

  onSearchComplete(items: Movie[]): void {
    this.moviesService.refreshMovies(items);
  }

  onResetFilter(): void {
    this.moviesService.getMovies();
  }
}
