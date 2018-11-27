import { MoviesState } from './../../../model/movies-state/movies-state';
import { GenreFilterComponent } from './../filter-by-genre/genre-filter.component';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MoviesStore } from './../../../model/movies-state/movies-store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from './../../../lib/material/custom-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { click } from 'testing/click.helper';
import { By } from '@angular/platform-browser';
import { movies } from '../../../../data/movie.mock-data';

import { FiltersHostComponent } from './filters-host.component';
import { SearchComponent } from 'src/app/feature/filters/filter-by-name/search.component';
import { MoviesSuccessEvent } from '../../../model/movies-state/movies-events';

describe('FiltersHostComponent', () => {
  let component: FiltersHostComponent;
  let fixture: ComponentFixture<FiltersHostComponent>;

  const moviesStore = jasmine.createSpyObj('MoviesStore', ['observe', 'dispatch']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FiltersHostComponent,
        SearchComponent,
        GenreFilterComponent
      ],
      imports: [
        BrowserAnimationsModule,
        CustomMaterialModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: MoviesStore, useValue: moviesStore }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    // const state: MoviesState = {
    //   container: {
    //     movies: movies
    //   }
    // };
    const storeObserveSpy = moviesStore.observe.and.returnValue(of([]));

    fixture = TestBed.createComponent(FiltersHostComponent);
    component = fixture.componentInstance;
    component.movies = movies;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter by a name', fakeAsync(() => {
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input[name=searchbyaname]')).nativeElement;
    input.focus();
    input.value = 'd';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const event = new KeyboardEvent("keyup", {
      "key": "Enter"
    });
    input.dispatchEvent(event);
    fixture.detectChanges();

    tick();
    fixture.detectChanges();

    const calls = moviesStore.dispatch.calls.all();
    expect(calls.length > 0).toBeTruthy();
    expect(calls[calls.length - 1].args[0].payload.length).toBe(10);
  }));

  it('should filter by a genre', () => {
    const trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
    trigger.click();
    fixture.detectChanges();

    const option = fixture.debugElement.query(By.css('.option-action')).nativeElement;
    option.click();
    fixture.detectChanges();

    const cinema = fixture.debugElement.query(By.css('.cinema-filter')).nativeElement;
    cinema.click();
    fixture.detectChanges();

    const calls = moviesStore.dispatch.calls.all();
    expect(calls[calls.length - 1].args[0].payload.length).toBe(15);
  });
});
