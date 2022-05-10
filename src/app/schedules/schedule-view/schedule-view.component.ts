import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employees/employee.service';
import { Site } from 'src/app/models/site/site';

@Component({
  selector: 'app-schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrls: ['./schedule-view.component.scss']
})
export class ScheduleViewComponent implements OnInit {
  site: Site|null;

  constructor(
    private authService: AuthService,
    private empService: EmployeeService
  ) {
    var site = this.authService.getSite();
    if (site && site.employees && site.employees.length <= 0) {
      this.authService.showProgress = true;
      this.authService.statusMessage = "Loading Site Employees";
      this.empService.getSiteEmployees().subscribe(employees => {
        site?.employees?.push(...employees);
      });
      this.authService.setSite(site);
      this.authService.statusMessage = "Site Employees Loaded";
      this.authService.showProgress = false;
    }
    this.site = site;
  }
  ngOnInit(): void {
  }

}
