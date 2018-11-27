import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { CustomMaterialModule } from '../../../lib/material/custom-material.module';
import { MoviesStore } from 'src/app/model/movies-state/movies-store';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  const moviesStore = jasmine.createSpyObj('MoviesStore', ['observe', 'dispatch']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [
        BrowserAnimationsModule,
        CustomMaterialModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: MoviesStore, useValue: moviesStore },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const storeObserveSpy = moviesStore.observe.and.returnValue(of(null));

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
