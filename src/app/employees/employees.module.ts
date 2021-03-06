import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScheduleModule } from './schedule/schedule.module';
import { ProfileComponent } from './profile/profile.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeeComponent } from './employee/employee.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactRowComponent } from './contacts/contact-row/contact-row.component';
import { SpecialtiesModule } from './specialties/specialties.module';
import { LeavesModule } from './leaves/leaves.module';
import { LeaveRequestModule } from './leave-request/leave-request.module';

@NgModule({
  declarations: [
    ProfileComponent,
    EmployeeComponent,
    ContactsComponent,
    ContactRowComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ScheduleModule,
    EmployeesRoutingModule,
    SpecialtiesModule,
    LeavesModule,
    LeaveRequestModule
  ]
})
export class EmployeesModule { }
