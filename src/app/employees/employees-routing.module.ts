import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { ProfileComponent } from './profile/profile.component';
import { CalendarMonthComponent } from './schedule/calendar-month/calendar-month.component';

const routes: Routes = [
  { path: '',
    component: EmployeeComponent,
    children: [
      { path: "home", component: CalendarMonthComponent},
      { path: "profile", component: ProfileComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
