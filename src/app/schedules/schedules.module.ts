import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScheduleViewComponent } from './schedule-view/schedule-view.component';
import { SchedulesDayComponent } from './schedules-day/schedules-day.component';

@NgModule({
  declarations: [
    ScheduleViewComponent,
    SchedulesDayComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ]
})
export class SchedulesModule { }
