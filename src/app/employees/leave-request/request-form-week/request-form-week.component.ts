import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Leave } from 'src/app/models/employee/leaves/leave';
import { LeaveRequest } from 'src/app/models/employee/leaves/leaveRequest';

@Component({
  selector: 'app-request-form-week',
  templateUrl: './request-form-week.component.html',
  styleUrls: ['./request-form-week.component.scss']
})
export class RequestFormWeekComponent implements OnInit {
  private _dates: Leave[] = [];
  @Input() requestid: string = "";
  @Input() employeeid: string = "";
  @Input() startdate: Date = new Date();
  @Input() enddate: Date = new Date();
  @Input() set dates(value: Leave[]) {
    this._dates = value;
  }
  get dates(): Leave[] {
    return this._dates;
  }
  @Output() changeWeek = new EventEmitter<LeaveRequest>();
  
  constructor() { 
    this.dates = [];
  }

  ngOnInit(): void {
  }

  changeLeaveRequest(req: LeaveRequest) {
    this.changeWeek.emit(req);
  }
}
