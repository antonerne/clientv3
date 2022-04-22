import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtyGroupComponent } from './specialty-group.component';

describe('SpecialtyGroupComponent', () => {
  let component: SpecialtyGroupComponent;
  let fixture: ComponentFixture<SpecialtyGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialtyGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialtyGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
