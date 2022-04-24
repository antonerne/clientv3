import { Component, Input, OnInit } from '@angular/core';
import { IEmployee, Employee } from 'src/app/models/employee/employee';
import { LeaveHoliday } from 'src/app/models/employee/leaves/leaveGroup';
import { ITeam, Team } from 'src/app/models/team/team';

@Component({
  selector: 'app-leave-holidays',
  templateUrl: './leave-holidays.component.html',
  styleUrls: ['./leave-holidays.component.scss']
})
export class LeaveHolidaysComponent implements OnInit {
  private _team: Team = new Team();
  private _employee: Employee = new Employee();
  private _year: number = (new Date()).getFullYear();
  @Input() set employee(value: IEmployee) {
    this._employee = new Employee(value);
    this.setHolidays();
  }
  get employee(): Employee {
    return this._employee;
  }
  @Input() set team(value: ITeam) {
    this._team = new Team(value);
    this.setHolidays();
  }
  get team(): Team {
    return this._team;
  }
  @Input() set year(value: number) {
    this._year = value;
    this.setHolidays();
  }
  get year(): number {
    return this._year;
  }
  holidays: LeaveHoliday[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  setHolidays() {
    this.holidays = new Array();
    if (this.team) {
      if (this.team.companies) {
        this.team.companies.forEach(co => {
          if (this.employee.companyinfo.company_code.toLowerCase() 
            === co.code.toLowerCase()) {
            co.holidays.forEach(hol => {
              this.holidays.push(new LeaveHoliday(hol))
            });
          }
        });
      }
    }
    if (this.holidays.length > 0) {
      this.holidays.sort((a,b) => a.compareTo(b));
      this.employee.leaves.sort((a,b) => a.compareTo(b));
      let start = new Date(this.year, 1, 1);
      let end = new Date(this.year, 12, 31);
      this.employee.leaves.forEach(lv => {
        if (lv.code.toLowerCase() === 'h' && lv.leave_date >= start 
          && lv.leave_date <= end) {
          if (lv.hours === 8.0) {
            let found = false;
            for (let i=0; i < this.holidays.length && !found; i++) {
              if (this.holidays[i].getHours() === 0) {
                found = true;
                this.holidays[i].addLeave(lv);
              }
            }
          } else if (lv.hours < 8.0) {
            let found = false;
            for (let i=0; i < this.holidays.length && !found; i++) {
              if ((this.holidays[i].getHours() + lv.hours) <= 8.0) {
                found = true;
                this.holidays[i].addLeave(lv);
              }
            }
          }
        }
      });
    }
  }
}
