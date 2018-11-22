import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, By } from '@angular/platform-browser';
import { CustomMaterialModule } from './../../../lib/material/custom-material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieItemComponent } from './movie-item.component';
import { Movie } from '../../../model/movie';

describe('MovieItemComponent', () => {
  let component: MovieItemComponent;
  let fixture: ComponentFixture<MovieItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MovieItemComponent
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CustomMaterialModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieItemComponent);
    component = fixture.componentInstance;
    component.movie = new Movie({name: 'Terminator', description: 'Action movie', key: 'terminator'});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display movie Name and Description', () => {
    const name = fixture.debugElement.query(By.css('.movie-name')).nativeElement;
    const description = fixture.debugElement.query(By.css('.movie-description')).nativeElement;

    expect(name.textContent).toContain('Terminator');
    expect(description.textContent).toContain('Action movie');
  });

  it('should provide image alt name', () => {
    const image = fixture.debugElement.query(By.css('.movie-image')).nativeElement;
    expect(image.alt).toContain('Photo of a terminator');
  });
});
