import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveHolidayComponent } from './leave-holiday.component';

describe('LeaveHolidayComponent', () => {
  let component: LeaveHolidayComponent;
  let fixture: ComponentFixture<LeaveHolidayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveHolidayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
