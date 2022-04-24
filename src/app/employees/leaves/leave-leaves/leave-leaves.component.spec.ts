import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveLeavesComponent } from './leave-leaves.component';

describe('LeaveLeavesComponent', () => {
  let component: LeaveLeavesComponent;
  let fixture: ComponentFixture<LeaveLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveLeavesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
