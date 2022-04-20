import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { LoginComponent } from './auth/login/login.component';
import { MustchangeComponent } from './auth/mustchange/mustchange.component';
import { VerifyComponent } from './auth/verify/verify.component';
import { CalendarMonthComponent } from './employees/schedule/calendar-month/calendar-month.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'forgot', component: ForgotComponent},
  { path: 'mustchange', component: MustchangeComponent},
  { path: 'verify', component: VerifyComponent},
  { path: '', component: CalendarMonthComponent, children: [
    { path: 'employee', loadChildren: () => import('./employees/employees.module')
      .then(m => m.EmployeesModule)},
  ]},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
