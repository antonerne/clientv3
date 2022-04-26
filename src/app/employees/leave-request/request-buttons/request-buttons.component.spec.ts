import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestButtonsComponent } from './request-buttons.component';

describe('RequestButtonsComponent', () => {
  let component: RequestButtonsComponent;
  let fixture: ComponentFixture<RequestButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
