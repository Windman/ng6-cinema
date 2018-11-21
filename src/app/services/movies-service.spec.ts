import { Movie } from '../model/movie';
import { MoviesService } from './movies-service';

describe('Movies Service', () => {
  let service: MoviesService;

  beforeEach(() => {
    service = new MoviesService();
  });

  it('should push all cached movies to the stream', () => {
    service.movies$.subscribe(movies => {
      expect(movies.length).toBeGreaterThan(0);
    });

    service.getMovies();
  });

  it('should push certain movies to the stream', () => {
    service.movies$.subscribe(movies => {
      expect(movies.length).toEqual(1);
    });

    service.refreshMovies([new Movie()]);
  });

  it('should get movie by id', () => {
    const movieId = 1;
    service.getMovie(movieId).subscribe(movie => {
      expect(movie.id).toBe(movieId);
    });
  });

  it('should return null if no movies being found', () => {
    const badId = -99;
    service.getMovie(badId).subscribe(movie => {
      expect(movie).toBe(null);
    });
  });

});
