import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationHeaderSearchComponent } from './location-header-search.component';

describe('LocationHeaderSearchComponent', () => {
  let component: LocationHeaderSearchComponent;
  let fixture: ComponentFixture<LocationHeaderSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationHeaderSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationHeaderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
