import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MoviesStore } from './../../../model/movies-state/movies-store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from './../../../lib/material/custom-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersHostComponent } from './filters-host.component';

describe('FiltersHostComponent', () => {
  let component: FiltersHostComponent;
  let fixture: ComponentFixture<FiltersHostComponent>;

  const moviesStore = jasmine.createSpyObj('MoviesStore', ['observe', 'dispatch']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltersHostComponent ],
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
    fixture = TestBed.createComponent(FiltersHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
