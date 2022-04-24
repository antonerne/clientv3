import { Component, Input, OnInit } from '@angular/core';
import { ILeave, Leave } from 'src/app/models/employee/leaves/leave';
import { LeaveGroup } from 'src/app/models/employee/leaves/leaveGroup';

@Component({
  selector: 'app-leave-date',
  templateUrl: './leave-date.component.html',
  styleUrls: ['./leave-date.component.scss']
})
export class LeaveDateComponent implements OnInit {

  @Input() leavedates: LeaveGroup = new LeaveGroup([]);
  @Input() leave:Leave = new Leave();
  @Input() textcolor: string = "000000";
  @Input() isholiday: boolean = false;
  @Input() standardhours: number = 8.0;
  @Input() addcomma: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  getDisplay(): string {
    let months = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
      "Aug", "Sep", "Oct", "Nov", "Dec");
    if (this.isholiday) {
      if (this.leave) {
        return `${this.leave.leave_date.getDate()} `
          + `${months[this.leave.leave_date.getMonth()]}`;
      }
      return "";
    } else {
      if (this.leavedates.leaves.length > 1) {
        this.leavedates.leaves.sort((a,b) => a.compareTo(b));
        let date1: Date = this.leavedates.leaves[0].leave_date;
        let date2: Date = this.leavedates.leaves[this.leavedates.leaves.length - 1].leave_date;
        return `${date1.getDate()}-${date2.getDate()}`;
      } else if (this.leavedates.leaves.length > 0) {
        let date1: Date = this.leavedates.leaves[0].leave_date;
        return `${date1.getDate()}`;
      }
      return "";
    }
  }

  getHours(): string {
    if (this.leavedates.leaves.length > 0) {
      if (this.leavedates.leaves[0].hours < this.standardhours) {
        return this.leavedates.leaves[0].hours.toFixed(1);
      }
    } else if (this.leave.hours > 0 && this.leave.hours < this.standardhours) {
      return this.leave.hours.toFixed(1);
    }
    return "";
  }

  getStyle(): string {
    return `color: #${this.textcolor};`;
  }
}
