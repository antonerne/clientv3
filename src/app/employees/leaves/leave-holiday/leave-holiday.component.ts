import { Component, Input, OnInit } from '@angular/core';
import { Leave } from 'src/app/models/employee/leaves/leave';
import { LeaveHoliday } from 'src/app/models/employee/leaves/leaveGroup';

@Component({
  selector: 'app-leave-holiday',
  templateUrl: './leave-holiday.component.html',
  styleUrls: ['./leave-holiday.component.scss']
})
export class LeaveHolidayComponent implements OnInit {
  private _year: number = (new Date()).getFullYear();
  private _holiday: LeaveHoliday = new LeaveHoliday();
  @Input() set year(value: number) {
    this._year = value;
  }
  get year(): number {
    return this._year;
  }
  @Input() set holiday(value: LeaveHoliday) {
    this._holiday = new LeaveHoliday(value.holiday, value.leaves);
  }
  get holiday(): LeaveHoliday {
    return this._holiday;
  }

  constructor() { }

  ngOnInit(): void {
  }

  getTextColor(lv: Leave): string {
    if (lv.status.toLowerCase() === 'actual') {
      return "0000ff";
    }
    return "ff0000";
  }

  getActualDate(): string {
    let months = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
      "Aug", "Sep", "Oct", "Nov", "Dec");
    let answer = "";
    if (this.holiday.holiday.actual_dates) {
      this.holiday.holiday.actual_dates.forEach(dt => {
        if (dt.getFullYear() === this.year) {
          answer = `${dt.getDate()} ${months[dt.getMonth()]}`;
        }
      });
    }
    return answer;
  }

  getHours(): string {
    let answer: number = 0.0;
    this.holiday.leaves.forEach(lv => {
      if (lv.status.toLowerCase() === 'actual') {
        answer += lv.hours;
      }
    });
    return answer.toFixed(1);
  }

}
