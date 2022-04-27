import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Leave } from 'src/app/models/employee/leaves/leave';
import { LeaveRequest } from 'src/app/models/employee/leaves/leaveRequest';
import { Team } from 'src/app/models/team/team';

@Component({
  selector: 'app-request-form-days',
  templateUrl: './request-form-days.component.html',
  styleUrls: ['./request-form-days.component.scss']
})
export class RequestFormDaysComponent implements OnInit {
  private _leaveday: Leave = new Leave();
  private _startdate: Date = new Date();
  private _enddate: Date = new Date();
  @Input() employeeid: string = "";
  @Input() team: Team = new Team();
  @Input() set startdate(value: Date) {
    this._startdate = new Date(value);
    this.setWorkCode();
  }
  get startdate(): Date {
    return this._startdate;
  }
  @Input() set enddate(value: Date) {
    this._enddate = new Date(value);
    this.setWorkCode();
  }
  get enddate(): Date {
    return this._enddate;
  }
  @Input() set leaveday(value: Leave) {
    this._leaveday = new Leave(value);
    this.setWorkCode();
  }
  get leaveday(): Leave {
    return this._leaveday;
  }
  @Output() changeDay = new EventEmitter<LeaveRequest>()
  display: string = "";
  leaveCode: FormControl = new FormControl('');
  leaveHours: FormControl = new FormControl('');
  dayForm: FormGroup;
  aHours: number[] = new Array(0,1,2,3,4,5,6,7,8,9,10,11,12);
  sHours: string[] = new Array("", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "10", "11", "12");

  constructor(private fb: FormBuilder,
    private authService: AuthService) { 
    this.dayForm = this.fb.group({
      leaveCode: this.leaveCode,
      leaveHours: this.leaveHours
    });
    if (this.team.id === "") {
      let tm = this.authService.getTeam();
      if (tm) {
        this.team = new Team(tm);
      }
    }
  }

  ngOnInit(): void {
  }

  setWorkCode() {
    this.display = "background-color:white;color:black;";
    if (this.leaveday.leave_date.getTime() < this.startdate.getTime()
      || this.leaveday.leave_date.getTime() > this.enddate.getTime()) {
      this.display = "background-color:lightgray;color:black;";
    }
    if (this.leaveday.code !== "") {
      this.team.displayCodes?.forEach(dc => {
        if (dc.code.toLowerCase() === this.leaveday.code.toLowerCase()) {
          this.display = `background-color:#${dc.back_color};color:#${dc.text_color};`
        }
      });
    }
    this.leaveCode.setValue(this.leaveday.code);
    this.leaveHours.setValue(this.leaveday.hours);
  }

}
