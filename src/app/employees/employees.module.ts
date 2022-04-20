import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScheduleModule } from './schedule/schedule.module';
import { ProfileComponent } from './profile/profile.component';
import { EmployeesRoutingModule } from './employees-routing.module';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ScheduleModule
  ]
})
export class EmployeesModule { }
