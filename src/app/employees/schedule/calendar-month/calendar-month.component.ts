import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: ['./calendar-month.component.scss']
})
export class CalendarMonthComponent implements OnInit {
  baseDate: Date = new Date();
  weeks: Array<Date[]> = new Array();
  months = new Array("January", "Febuary", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December");
  
  constructor() {
    const today: Date = new Date();
    this.baseDate = new Date(today.getFullYear(), today.getMonth(), 1);
    this.setWeeks();
  }

  ngOnInit(): void {
  }

  setWeeks(): void {
    var start:Date = new Date(Date.UTC(this.baseDate.getFullYear(), 
      this.baseDate.getMonth(), 1));
    while (start.getDay() != 0) {
      start = new Date(start.getTime() - (24 * 3600000));
    }

    var end: Date = new Date(Date.UTC(this.baseDate.getFullYear(), 
      this.baseDate.getMonth() + 1, 0));
    while (end.getDay() != 6) {
      end = new Date(end.getTime() + (24 * 3600000));
    }
    this.weeks = new Array<Date[]>();
    var newweek: Date[] = [];
    while (start.getTime() <= end.getTime()) {
      if (start.getDay() === 0) {
        if (newweek !== undefined && newweek.length > 0) {
          this.weeks.push(newweek);
        }
        newweek = [];
      }
      newweek.push(start);
      start = new Date(start.getTime() + (24 * 3600000));
    }
    if (newweek !== undefined && newweek.length > 0) {
      this.weeks.push(newweek);
    }
  }

  addMonth() {
    var iDir: number = 1;
    this.baseDate = new Date(this.baseDate.getFullYear(), 
      this.baseDate.getMonth() + iDir, 1);
    this.setWeeks();
  }

  subMonth() {
    var iDir: number = -1;
    this.baseDate = new Date(this.baseDate.getFullYear(), 
      this.baseDate.getMonth() + iDir, 1);
    this.setWeeks();
  }
}
