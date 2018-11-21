
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MoviesListComponent } from './movies-list.component';
import { Router } from '@angular/router';
import { MovieItemComponent } from './movie-item/movie-item.component';

import { movies } from '../../../data/movie.mock-data';
import { click } from 'testing/click.helper';

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;

  const routerMock = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MoviesListComponent,
        MovieItemComponent
      ],
      providers: [
        { provide: Router, useValue: routerMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    component.movies = Object.assign([], movies);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should tell ROUTER to navigate when movie clicked', () => {
    fixture.detectChanges();

    const movieItem = fixture.debugElement.query(By.css('.movie-item')).nativeElement;
    click(movieItem);
    fixture.detectChanges();

    const navArgs = routerMock.navigate.calls.first().args[0];
    const url = navArgs[0];
    const id = navArgs[1];

    expect(url).toBe('/details');
    expect(id).toBe(+movieItem.id);
  });
});
