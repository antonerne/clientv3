import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveRequestComponent } from './leave-request.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RequestButtonsComponent } from './request-buttons/request-buttons.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { RequestFormDaysComponent } from './request-form-days/request-form-days.component';
import { RequestFormPeriodComponent } from './request-form-period/request-form-period.component';
import { RequestFormWeekComponent } from './request-form-week/request-form-week.component';



@NgModule({
  declarations: [
    LeaveRequestComponent,
    RequestButtonsComponent,
    RequestFormComponent,
    RequestFormDaysComponent,
    RequestFormPeriodComponent,
    RequestFormWeekComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ]
})
export class LeaveRequestModule { }
