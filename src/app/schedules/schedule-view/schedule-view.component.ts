import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employees/employee.service';
import { Employee } from 'src/app/models/employee/employee';
import { Site } from 'src/app/models/site/site';
import { Team } from 'src/app/models/team/team';

@Component({
  selector: 'app-schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrls: ['./schedule-view.component.scss']
})
export class ScheduleViewComponent implements OnInit {
  site: Site;
  team: Team;
  monthShown: Date = new Date();
  endDate: Date = new Date();
  monthCss: string = "";
  workcenterCss: string = "";
  daysInMonth = 30;
  daysOfMonth: number[] = [];

  constructor(
    private authService: AuthService,
    private empService: EmployeeService
  ) {
    var site = this.authService.getSite();
    if (site) {
      this.site = new Site(site);
    } else {
      this.site = new Site();
    }
    if (this.site) {
      this.authService.showProgress = true;
      this.authService.statusMessage = "Loading Site Employees";
      this.empService.getSiteEmployees().subscribe(employees => {
        if (this.site && this.site.employees) {
          this.site.employees = []
          employees.forEach(emp => {
            if (this.site.employees) {
              this.site.employees.push(new Employee(emp));
            }
          });
          this.site.employees.sort((a,b) => a.compareTo(b));
          this.authService.setSite(this.site);
          if (this.monthShown.getDate() === 1) {
            this.changeMonth("", "");
          }
          this.authService.statusMessage = "Site Employees Loaded";
          this.authService.showProgress = false;
        }
      });
    }
    let tm = this.authService.getTeam();
    if (tm) {
      this.team = new Team(tm);
    } else {
      this.team = new Team();
    }
    this.monthShown = new Date();
    while (this.monthShown.getDate() !== 1) {
      this.monthShown = new Date(this.monthShown.getTime() - (24 * 3600000));
    }
    this.changeMonth("", "");
  }
  ngOnInit(): void {
  }

  changeMonth(direction: string, amount: string) {
    if (direction.toLowerCase() === "up") {
      if (amount.toLowerCase() === "month") {
        let currentMonth = this.monthShown.getMonth();
        let currentYear = this.monthShown.getFullYear();
        currentMonth++;
        if (currentMonth >= 12) {
          currentMonth = 0;
          currentYear++;
        }
        this.monthShown = new Date(currentYear, currentMonth, 1);
      } else if (amount.toLowerCase() === "year") {
        let currentYear = this.monthShown.getFullYear() + 1;
        this.monthShown = new Date(currentYear, this.monthShown.getMonth(), 1)
      }
    } else if (direction.toLowerCase() === "down") {
      if (amount.toLowerCase() === "month") {

      } else if (amount.toLowerCase() === "year") {

      }
    }
    this.endDate = new Date(this.monthShown.getFullYear(), 
      this.monthShown.getMonth() + 1, 1);
    this.endDate = new Date(this.endDate.getTime() - (24 * 3600000));
    this.daysInMonth = this.endDate.getDate();

    // set the employee lists by workcenter/position, else just by workcenter
    // each employee is only listed once.
    this.site?.workcenters?.forEach(wc => {
      if (wc.positions && wc.positions.length > 0) {
        wc.positions.forEach(pos => {
          pos.employees = [];
        });
      }
      wc.employees = [];
    });

    let siteid = "";
    if (this.site) {
      siteid = this.site.code;
    }
    this.site?.employees?.forEach(e => {
      let emp = new Employee(e);
      let found = false;  // used for setting into a position
      this.site?.workcenters?.forEach(wc => {
        if (wc.positions && wc.positions.length > 0) {
          wc.positions.forEach(pos => {
            if (pos.employeeids) {
              pos.employeeids.forEach(eid => {
                if (emp.id === eid) {
                  found = true;
                  pos.employees?.push(new Employee(emp));
                }
              });
            }
          });
        }
      });
      if (!found) {
        let currentWorkcenter = emp.getWorkcenter(this.monthShown, this.endDate, 
          siteid);
        this.site?.workcenters?.forEach(wc => {
          if (wc.id === currentWorkcenter 
            || wc.title.toLowerCase() === currentWorkcenter?.toLowerCase()) {
            wc.employees?.push(new Employee(emp));
          }
        })
      }
    });

    // set the month display and workcenter widths as css
    let totalWidth = 202 + (this.daysInMonth * 27);  // two extra for borders
    let monthWidth = totalWidth - 408;  // each direction has 2px in borders
    let workcenterWidth = totalWidth - 20;
    this.monthCss = `width:${monthWidth}px;`;
    this.workcenterCss = `width:${workcenterWidth}px;`;
    this.daysOfMonth = [];
    for (let i=1; i <= this.daysInMonth; i++) {
      this.daysOfMonth.push(i);
    }
  }

  getDateCss(day: number) {
    let dateShown = new Date(this.monthShown.getFullYear(), 
      this.monthShown.getMonth(), day);
    if (dateShown.getDay() === 6 || dateShown.getDay() === 0) {
      return "background-color:#33ccff;color: black;"
    }
    return "background-color: white;color: black;"
  }

  getMonth(): string {
    let months = new Array("January", "Febuary", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December");
    return `${months[this.monthShown.getMonth()]} ${this.monthShown.getFullYear()}`;
  }

  getWorkCodeCss(employee: Employee, day: number): string {
    let workdate = new Date(this.monthShown.getFullYear(),
      this.monthShown.getMonth(), day);
    let workday = employee.getWorkday(workdate, this.site.code, true);
    let answer = "background-color: #ffffff;color: #000000;";
    this.team.displayCodes?.forEach(dc => {
      if (dc.code.toLowerCase() === workday.code.toLowerCase()) {
        answer = `background-color:#${dc.back_color};color:#${dc.text_color};`;
      }
    });
    if (answer.indexOf("#ffffff") >= 0 && (workdate.getDay() === 6 
      || workdate.getDay() === 0)) {
      answer = "background-color: #33ccff;color: black;";
    }
    return answer;
  }

  getWorkCode(employee: Employee, day: number): string {
    let workdate = new Date(this.monthShown.getFullYear(),
      this.monthShown.getMonth(), day);
    let workday = employee.getWorkday(workdate, this.site.code, true);
    return workday.code;
  }
}
