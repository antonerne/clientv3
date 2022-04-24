import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveHolidaysComponent } from './leave-holidays.component';

describe('LeaveHolidaysComponent', () => {
  let component: LeaveHolidaysComponent;
  let fixture: ComponentFixture<LeaveHolidaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveHolidaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
