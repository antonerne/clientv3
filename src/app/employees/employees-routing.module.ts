import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { EmployeeComponent } from './employee/employee.component';
import { LeavesComponent } from './leaves/leaves.component';
import { ProfileComponent } from './profile/profile.component';
import { CalendarMonthComponent } from './schedule/calendar-month/calendar-month.component';
import { SpecialtiesComponent } from './specialties/specialties.component';

const routes: Routes = [
  { path: '',
    component: EmployeeComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: "home", component: CalendarMonthComponent},
      { path: "profile", component: ProfileComponent},
      { path: "contacts", component: ContactsComponent},
      { path: "specialty", component: SpecialtiesComponent},
      { path: "leaves", component: LeavesComponent }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
