import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Movie } from '../../model/movie';
import { MoviesService } from '../../services/movies-service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie;

  constructor(private route: ActivatedRoute
    , private moviesService: MoviesService) { }

  ngOnInit() {
    this.route.paramMap
      .pipe(switchMap(pmap => {
        const movieId = +pmap.get('id');
        return this.moviesService.getMovie(movieId);
      })).subscribe(movie => {
        this.movie = movie;
      });
  }

}
