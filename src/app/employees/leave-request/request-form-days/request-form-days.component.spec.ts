import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFormDaysComponent } from './request-form-days.component';

describe('RequestFormDaysComponent', () => {
  let component: RequestFormDaysComponent;
  let fixture: ComponentFixture<RequestFormDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestFormDaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestFormDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
