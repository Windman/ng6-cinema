import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';

import { MoviesListComponent } from './movies-list.component';
import { Router } from '@angular/router';
import { MovieItemComponent } from './movie-item/movie-item.component';

import { movies } from '../../../data/movie.mock-data';
import { click } from 'testing/click.helper';
import { CustomMaterialModule } from '../../lib/material/custom-material.module';

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
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CustomMaterialModule
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

  xit('should tell ROUTER to navigate when movie clicked', () => {
    // TODO check why *cdkVirtualFor doesn't reflect elements in tests env?
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
