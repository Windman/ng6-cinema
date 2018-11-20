import { Component, OnInit } from '@angular/core';

import { BaseComponent } from '../../base.component';
import { Movie } from '../../model/movie';
import { MoviesService } from '../../services/movies-service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent extends BaseComponent implements OnInit {
  movies: Movie[];

  constructor(private moviesService: MoviesService) {
    super();
  }

  ngOnInit() {
    this.moviesService.getMovies()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(movies => {
      this.movies = movies;
    });
  }

}
