import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersHostComponent } from './filters-host.component';

describe('FiltersHostComponent', () => {
  let component: FiltersHostComponent;
  let fixture: ComponentFixture<FiltersHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltersHostComponent ]
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
