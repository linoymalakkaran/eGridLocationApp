import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationTableViewComponent } from './location-table-view.component';

describe('LocationTableViewComponent', () => {
  let component: LocationTableViewComponent;
  let fixture: ComponentFixture<LocationTableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationTableViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
