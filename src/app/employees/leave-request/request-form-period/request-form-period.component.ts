import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Leave } from 'src/app/models/employee/leaves/leave';
import { LeaveRequest } from 'src/app/models/employee/leaves/leaveRequest';

@Component({
  selector: 'app-request-form-period',
  templateUrl: './request-form-period.component.html',
  styleUrls: ['./request-form-period.component.scss']
})
export class RequestFormPeriodComponent implements OnInit {
  private _days: Leave[] = [];
  @Input() employeeid: string = '';
  @Input() startdate: Date = new Date();
  @Input() enddate: Date = new Date();
  @Input() set days(value: Leave[]) {
    this._days = [];
    value.forEach(lv => {
      this._days.push(new Leave(lv));
    });
    this.setWeeks();
  }
  get days(): Leave[] {
    return this._days;
  }
  @Output() changePeriod = new EventEmitter<LeaveRequest>();
  weeks: Array<Leave[]> = []

  constructor() { }

  ngOnInit(): void {
  }

  setWeeks() {
    this.days.sort((a,b) => a.compareTo(b));
    this.weeks = [];
    let newweek: Leave[] = [];
    this.days.forEach(lv => {
      if (lv.leave_date.getDay() === 0) {
        if (newweek.length > 0) {
          this.weeks.push(newweek);
        }
        newweek = [];
      }
      newweek.push(lv);
    });
    if (newweek.length > 0) {
      this.weeks.push(newweek);
    }
  }

  changeLeaveRequest(req: LeaveRequest) {
    this.changePeriod.emit(req);
  }
}
