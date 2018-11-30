import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../../base.component';
import { MoviesService } from '../../services/movies-service';
import { Movie } from '../../model/movie';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.scss']
})
export class CinemaComponent extends BaseComponent implements OnInit {
  movies: Movie[];

  constructor(private moviesService: MoviesService) {
    super();
  }

  ngOnInit() {
    this.moviesService
      .getMovies()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(movies => {
        this.movies = movies;
      });
  }
}
