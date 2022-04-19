import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarDayComponent } from './calendar-day/calendar-day.component';
import { CalendarWeekComponent } from './calendar-week/calendar-week.component';
import { CalendarMonthComponent } from './calendar-month/calendar-month.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
  
    CalendarDayComponent,
       CalendarWeekComponent,
       CalendarMonthComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ]
})
export class ScheduleModule { }
