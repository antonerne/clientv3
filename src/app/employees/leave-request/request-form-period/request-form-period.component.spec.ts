import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFormPeriodComponent } from './request-form-period.component';

describe('RequestFormPeriodComponent', () => {
  let component: RequestFormPeriodComponent;
  let fixture: ComponentFixture<RequestFormPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestFormPeriodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestFormPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
