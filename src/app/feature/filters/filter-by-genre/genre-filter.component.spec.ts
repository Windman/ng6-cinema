import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { click } from 'testing/click.helper';

import { GenreFilterComponent } from './genre-filter.component';
import { CustomMaterialModule } from 'src/app/lib/material/custom-material.module';
import { MoviesStore } from 'src/app/model/movies-state/movies-store';

describe('GenreFilterComponent', () => {
  let component: GenreFilterComponent;
  let fixture: ComponentFixture<GenreFilterComponent>;

  const moviesStore = jasmine.createSpyObj('MoviesStore', ['observe', 'dispatch']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenreFilterComponent ],
      imports: [
        BrowserAnimationsModule,
        CustomMaterialModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: MoviesStore, useValue: moviesStore },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const storeObserveSpy = moviesStore.observe.and.returnValue(of(null));

    fixture = TestBed.createComponent(GenreFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset criteria if clear bytton clicked', () => {
    fixture.componentInstance.criteria = '123456';
    const genresClear = fixture.debugElement.query(By.css('.genres-clear-button')).nativeElement;
    click(genresClear);

    expect(fixture.componentInstance.criteria).toBe('');
  });

});
