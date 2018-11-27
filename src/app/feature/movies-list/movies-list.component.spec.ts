import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { MoviesStore } from './../../model/movies-state/movies-store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';

import { MoviesListComponent } from './movies-list.component';
import { Router } from '@angular/router';
import { MovieItemComponent } from './movie-item/movie-item.component';

import { movies } from '../../../data/movie.mock-data';
import { click } from 'testing/click.helper';
import { CustomMaterialModule } from '../../lib/material/custom-material.module';

@Component({
  template: `
  <div class="movies-container">
    <ng-container *ngFor="let movie of movies">
      <app-movie-item class="movie-item"
                      id={{movie.id}}
                      [movie]="movie"
                      (click)="onMovieClick(movie)">
      </app-movie-item>
    </ng-container>
  </div>`
})
class TestHostComponent extends MoviesListComponent {

}

describe('MoviesListComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  const routerMock = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
  const moviesStore = jasmine.createSpyObj('MoviesStore', ['observe', 'dispatch']);
  const snakBarr = jasmine.createSpyObj('MatSnackBar', ['open']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestHostComponent,
        MoviesListComponent,
        MovieItemComponent
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CustomMaterialModule
      ],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: MoviesStore, useValue: moviesStore },
        { provide: MatSnackBar, useValue: snakBarr }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const storeObserveSpy = moviesStore.observe.and.returnValue(of(null));

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    component.movies = Object.assign([], movies);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should tell ROUTER to navigate when movie clicked', () => {
    // TODO check why *cdkVirtualFor doesn't reflect elements in tests env?
    const movieItem = fixture.debugElement.query(By.css('.movie-item')).nativeElement;
    click(movieItem);
    fixture.detectChanges();

    const navArgs = routerMock.navigate.calls.first().args[0];
    const url = navArgs[0];
    const id = navArgs[1];

    expect(url).toBe('/details');
    expect(id).toBe(+movieItem.id);
  });

  it('should display 24 movies in the cinema', () => {
    const moviesLength = fixture.debugElement.queryAll(By.css('.movie-item')).length;
    expect(moviesLength).toBe(24);
  });
});
