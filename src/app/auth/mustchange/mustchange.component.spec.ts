import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MustchangeComponent } from './mustchange.component';

describe('MustchangeComponent', () => {
  let component: MustchangeComponent;
  let fixture: ComponentFixture<MustchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MustchangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MustchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
