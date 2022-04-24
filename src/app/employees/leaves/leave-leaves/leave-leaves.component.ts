import { Component, Input, OnInit } from '@angular/core';
import { Employee, IEmployee } from 'src/app/models/employee/employee';
import { LeaveGroup, LeaveMonth } from 'src/app/models/employee/leaves/leaveGroup';
import { ITeam, Team } from 'src/app/models/team/team';

@Component({
  selector: 'app-leave-leaves',
  templateUrl: './leave-leaves.component.html',
  styleUrls: ['./leave-leaves.component.scss']
})
export class LeaveLeavesComponent implements OnInit {
  private _team: Team = new Team();
  private _employee: Employee = new Employee();
  private _year: number = (new Date()).getFullYear();
  @Input() set team(value: ITeam) {
    this._team = new Team(value);
  }
  get team(): Team {
    return this._team;
  }
  @Input() set employee(value: IEmployee) {
    this._employee = new Employee(value);
    this.setLeaves();
  }
  get employee(): Employee {
    return this._employee;
  }
  @Input() set year(value: number) {
    this._year = value;
    this.setLeaves();
  }
  get year(): number {
    return this._year;
  }
  leaveMonths: LeaveMonth[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  setLeaves() {
    this.leaveMonths = new Array();
    this.employee.leaves.sort((a,b) => a.compareTo(b));
    for (let i=0; i < 12; i++) {
      let start = new Date(this.year, i, 1);
      let end = new Date(this.year, i+1, 1);
      let lvMonth = new LeaveMonth(start);
      let currentCode = "";
      let currentDate: Date | null = null;
      let currentGroup: LeaveGroup = new LeaveGroup();
      this.employee.leaves.forEach(lv => {
        if (lv.code.toLowerCase() !== 'h' && lv.leave_date >= start 
          && lv.leave_date < end) {
          if (currentCode !== lv.code) {
            if (currentGroup.leaves.length > 0) {
              lvMonth.addLeaveGroup(currentGroup);
              currentGroup = new LeaveGroup()
            }
          } else if (!currentDate) {
            currentGroup = new LeaveGroup();
          } else if ((currentDate.getTime() + (24 * 3600000)) < lv.leave_date.getTime()) {
            if (currentGroup.leaves.length > 0) {
              lvMonth.addLeaveGroup(currentGroup)
              currentGroup = new LeaveGroup();
            }
          }
          currentCode = lv.code;
          currentDate = new Date(lv.leave_date);
          currentGroup.addLeave(lv);
        } 
      });
      if (currentGroup.leaves.length > 0) {
        lvMonth.addLeaveGroup(currentGroup);
      }
      this.leaveMonths.push(lvMonth);
    }
    this.leaveMonths.sort((a,b) => a.compareTo(b));
  }
}
