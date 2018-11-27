import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from './../../lib/material/custom-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FiltersHostComponent } from './../filters/filters-host/filters-host.component';
import { GenreFilterComponent } from './../filters/filter-by-genre/genre-filter.component';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { click } from 'testing/click.helper';
import { By, BrowserModule } from '@angular/platform-browser';
import { movies } from '../../../data/movie.mock-data';

import { MoviesService } from '../../services/movies-service';
import { CinemaComponent } from './cinema.component';
import { SearchComponent } from '../filters/filter-by-name/search.component';
import { MoviesStore } from 'src/app/model/movies-state/movies-store';
import { MoviesListComponent } from 'src/app/feature/movies-list/movies-list.component';
import { MovieItemComponent } from 'src/app/feature/movies-list/movie-item/movie-item.component';
import { MovieDetailsComponent } from 'src/app/feature/movie-details/movie-details.component';

describe('CinemaComponent', () => {
  let component: CinemaComponent;
  let fixture: ComponentFixture<CinemaComponent>;

  const moviesServiceMock = new MoviesService();
  const routerMock = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
  const moviesStore = jasmine.createSpyObj('MoviesStore', ['observe', 'dispatch']);
  const snakBarr = jasmine.createSpyObj('MatSnackBar', ['open']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CinemaComponent,
        FiltersHostComponent,
        SearchComponent,
        GenreFilterComponent,
        MoviesListComponent,
        MovieItemComponent,
        MovieDetailsComponent,
        SearchComponent,
        CinemaComponent,
        GenreFilterComponent,
        FiltersHostComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        BrowserModule,
        CustomMaterialModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: MoviesService, useValue: moviesServiceMock },
        { provide: MoviesStore, useValue: moviesStore },
        { provide: Router, useValue: routerMock },
        { provide: MoviesStore, useValue: moviesStore },
        { provide: MatSnackBar, useValue: snakBarr }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const storeObserveSpy = moviesStore.observe.and.returnValue(of(movies));

    fixture = TestBed.createComponent(CinemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
