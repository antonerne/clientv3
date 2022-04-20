import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Employee } from 'src/app/models/employee/employee';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnInit {
  private _today: Date = new Date();
  private _day: Date = new Date();
  private _baseDate = new Date();
  @Input() set today(value: Date) {
    this._today = value;
  }
  get today(): Date {
    return this._today;
  }
  @Input() set day(value: Date) {
    this._day = value;
    this.setWorkCode();
  }
  get day(): Date {
    return this._day;
  }
  @Input() set baseDate(value: Date) {
    this._baseDate = value;
    this.setWorkCode();
  }
  get baseDate(): Date {
    return this._baseDate;
  }
  workcode: string = "";
  workcenter: string = "";
  display: string = "";
  dayclass: string = "";

  constructor(private authService: AuthService) {
    var t: Date = new Date();
    this.today = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()));
  }

  ngOnInit(): void {
  }

  setWorkCode() {
    if (this.baseDate === undefined) {
      this._baseDate = new Date();
    }
    this.display = "background-color:white;color:black;";
    if (this.day.getMonth() !== this.baseDate.getMonth()) {
      this.display = "background-color:lightgray;color:black;";
    }
    this.dayclass = "date";
    if (this.today.getTime() == this.day.getTime()) {
      this.dayclass = "today";
    }
    let u = this.authService.getUser();
    let user = null;
    if (u) {
      user = new Employee(u);
    }
    let team = this.authService.getTeam();
    let site = this.authService.getSite();
    if (user && team && site) {
      let workday = user.getWorkday(this.day, site.code, true);
      this.workcode = workday.code;
      this.workcenter = (workday.work_center) ? workday.work_center : "";
      team.displayCodes?.forEach(dc => {
        if (dc.code === this.workcode 
          && (this.day.getMonth() === this.baseDate.getMonth()
            || dc.is_leave))
        {
          this.display = `background-color:#${dc.back_color};color:#${dc.text_color};`;
        }
      })
    }
  }
}
