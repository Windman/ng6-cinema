import { Movie } from './model/movie';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from './services/movies-service';
import { BaseComponent } from './base.component';
import { takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent implements OnInit {
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
