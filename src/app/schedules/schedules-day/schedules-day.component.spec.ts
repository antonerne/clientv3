import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulesDayComponent } from './schedules-day.component';

describe('SchedulesDayComponent', () => {
  let component: SchedulesDayComponent;
  let fixture: ComponentFixture<SchedulesDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulesDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulesDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
