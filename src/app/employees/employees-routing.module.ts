import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { CalendarMonthComponent } from './schedule/calendar-month/calendar-month.component';

const routes: Routes = [
  { path: '', component: CalendarMonthComponent },
  { path: 'home', component: CalendarMonthComponent },
  { path: "calendar", component: CalendarMonthComponent },
  { path: "profile", component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
