import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-week',
  templateUrl: './calendar-week.component.html',
  styleUrls: ['./calendar-week.component.scss']
})
export class CalendarWeekComponent implements OnInit {
  @Input() dates: Date[] = []; 
  @Input() baseDate: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
