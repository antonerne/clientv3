import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFormWeekComponent } from './request-form-week.component';

describe('RequestFormWeekComponent', () => {
  let component: RequestFormWeekComponent;
  let fixture: ComponentFixture<RequestFormWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestFormWeekComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestFormWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
