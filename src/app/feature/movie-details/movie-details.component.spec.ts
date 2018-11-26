import { Movie } from '../../model/movie';
import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsComponent } from './movie-details.component';
import { MoviesService } from '../../services/movies-service';
import { ActivatedRouteStub } from 'testing/activated-route.helper';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;

  const movieServiceMock = jasmine.createSpyObj('MoviesService', ['getMovie']);
  const activatedRoute = new ActivatedRouteStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieDetailsComponent ],
      providers: [
        { provide: MoviesService, useValue: movieServiceMock },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    component.movie = new Movie();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
