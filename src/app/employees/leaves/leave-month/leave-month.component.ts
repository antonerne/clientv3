import { Component, Input, OnInit } from '@angular/core';
import { LeaveGroup, LeaveMonth } from 'src/app/models/employee/leaves/leaveGroup';
import { Team } from 'src/app/models/team/team';

@Component({
  selector: 'app-leave-month',
  templateUrl: './leave-month.component.html',
  styleUrls: ['./leave-month.component.scss']
})
export class LeaveMonthComponent implements OnInit {
  @Input() team: Team = new Team();
  @Input() month: LeaveMonth = new LeaveMonth(new Date());
  @Input() standardhours: number = 8;

  constructor() { }

  ngOnInit(): void {
  }

  getMonth(): string {
    let months = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
      "Aug", "Sep", "Oct", "Nov", "Dec");
    return months[this.month.id.getMonth()];
  }

  getActualHours(): string {
    let answer = 0.0;
    this.month.groups.forEach(lg => {
      lg.leaves.forEach(lv => {
        if ((lv.code.toLowerCase() === "v" || lv.code.toLowerCase() === "p")
          && lv.status.toLowerCase() === "actual") {
          answer += lv.hours;
        }
      });
    });
    return answer.toFixed(1);
  }

  getPlannedHours(): string {
    let answer = 0.0;
    this.month.groups.forEach(lg => {
      lg.leaves.forEach(lv => {
        if ((lv.code.toLowerCase() === "v" || lv.code.toLowerCase() === "p")
          && lv.status.toLowerCase() !== "actual") {
          answer += lv.hours;
        }
      });
    });
    return answer.toFixed(1);
  }

  getTextColor(lg: LeaveGroup): string {
    let answer = "a11212"; // planned PTO
    let first = lg.leaves[0];
    if (first.code.toLowerCase() === 'v' || first.code.toLowerCase() === 'p') {
      if (first.status.toLowerCase() === 'actual') {
        answer = "0000ff";
      }
    } else {
      this.team.displayCodes?.forEach(dc => {
        if (first.code.toLowerCase() === dc.code.toLowerCase()) {
          answer = dc.back_color;
        }
      })
    }
    return answer;
  }
}
