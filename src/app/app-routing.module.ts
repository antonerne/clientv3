import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { LoginComponent } from './auth/login/login.component';
import { MustchangeComponent } from './auth/mustchange/mustchange.component';
import { VerifyComponent } from './auth/verify/verify.component';
import { EmployeesRoutingModule } from './employees/employees-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: "/home", pathMatch: 'full'},
  { path: 'home', component: LoginComponent },
  { path: 'login', component: LoginComponent},
  { path: 'forgot', component: ForgotComponent},
  { path: 'mustchange', component: MustchangeComponent},
  { path: 'verify', component: VerifyComponent},
  { path: 'employee',
    loadChildren: () => EmployeesRoutingModule},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
