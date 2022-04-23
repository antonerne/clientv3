import { Component, Input, OnInit } from '@angular/core';
import { Leave } from 'src/app/models/employee/leaves/leave';
import { Holiday } from 'src/app/models/team/holidays';

@Component({
  selector: 'app-leave-holiday',
  templateUrl: './leave-holiday.component.html',
  styleUrls: ['./leave-holiday.component.scss']
})
export class LeaveHolidayComponent implements OnInit {
  private _holiday: Holiday = new Holiday();
  private _leaves: Leave[] = [];
  @Input() set holiday(value: Holiday) {
    this._holiday = new Holiday(value);
  }
  get holiday(): Holiday {
    return this._holiday;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
