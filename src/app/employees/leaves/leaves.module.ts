import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveHolidayComponent } from './leave-holiday/leave-holiday.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LeaveMonthComponent } from './leave-month/leave-month.component';
import { LeaveDateComponent } from './leave-date/leave-date.component';
import { LeaveLeavesComponent } from './leave-leaves/leave-leaves.component';
import { LeaveHolidaysComponent } from './leave-holidays/leave-holidays.component';
import { LeavesComponent } from './leaves.component';

@NgModule({
  declarations: [
    LeaveHolidayComponent,
    LeaveMonthComponent,
    LeaveDateComponent,
    LeaveLeavesComponent,
    LeaveHolidaysComponent,
    LeavesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ]
})
export class LeavesModule { }
