import { Component, Input, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team/team';

@Component({
  selector: 'app-schedules-day',
  templateUrl: './schedules-day.component.html',
  styleUrls: ['./schedules-day.component.scss']
})
export class SchedulesDayComponent implements OnInit {
  private workCode: string = "";
  private dateShown: Date = new Date();
  cssStyle: string = "";
  @Input() team: Team = new Team();
  @Input() set workcode(value: string) {
    this.workCode = value;
    this.setWorkCode();
  }
  get workcode(): string {
    return this.workCode;
  }
  @Input() set dateshown(value: Date) {
    this.dateShown = new Date(value);
    this.setWorkCode();
  }
  get dateshown(): Date {
    return this.dateShown;
  }

  constructor() { }

  ngOnInit(): void {
  }

  setWorkCode() {
    let bWorkCode = false;
    this.cssStyle = "";
    this.team.displayCodes?.forEach(dc => {
      if (dc.code.toLowerCase() === this.workCode.toLowerCase()) {
        this.cssStyle = `background-color:#${dc.back_color};color:#${dc.text_color};`
        if (dc.back_color === "ffffff") {
          if (this.dateShown.getDay() === 0 || this.dateShown.getDay() === 6) {
            this.cssStyle = `background-color:#33ccff;color:#000000;`
          }
        }
      }
    });
  }
}
