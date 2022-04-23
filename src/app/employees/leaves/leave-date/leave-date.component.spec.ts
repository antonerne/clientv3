import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveDateComponent } from './leave-date.component';

describe('LeaveDateComponent', () => {
  let component: LeaveDateComponent;
  let fixture: ComponentFixture<LeaveDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
