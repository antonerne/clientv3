import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveMonthComponent } from './leave-month.component';

describe('LeaveMonthComponent', () => {
  let component: LeaveMonthComponent;
  let fixture: ComponentFixture<LeaveMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
