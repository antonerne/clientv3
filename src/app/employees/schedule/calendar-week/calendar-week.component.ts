import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-week',
  templateUrl: './calendar-week.component.html',
  styleUrls: ['./calendar-week.component.scss']
})
export class CalendarWeekComponent implements OnInit {
  private _dates: Date[];
  private _baseDate: Date;
  @Input() set dates(value: Date[]) {
    this._dates = value;
  }
  get dates(): Date[] {
    return this._dates;
  } 
  @Input() set baseDate(value: Date) {
    this._baseDate = value;
  }
  get baseDate(): Date {
    return this._baseDate;
  }

  constructor() {
    this._baseDate = new Date();
    this._dates = [];
   }

  ngOnInit(): void {
  }

}
