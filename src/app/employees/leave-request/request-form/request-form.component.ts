import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Employee } from 'src/app/models/employee/employee';
import { Leave } from 'src/app/models/employee/leaves/leave';
import { LeaveRequest, LeaveRequestComment } from 'src/app/models/employee/leaves/leaveRequest';
import { Site } from 'src/app/models/site/site';
import { Team } from 'src/app/models/team/team';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss']
})
export class RequestFormComponent implements OnInit {
  @Input() employee: Employee = new Employee();
  private _leaveRequest: LeaveRequest = new LeaveRequest();
  @Input() set leaverequest(value: LeaveRequest) {
    this._leaveRequest = new LeaveRequest(value);
    this.setLeaveRequest();
  }
  get leaverequest(): LeaveRequest {
    return this._leaveRequest;
  }
  @Input() team: Team = new Team();
  @Output() empchange = new EventEmitter<Employee>();
  requestForm: FormGroup;
  startControl: FormControl = new FormControl(new Date(), [Validators.required]);
  endControl: FormControl = new FormControl(new Date(), [Validators.required]);
  newcomment: FormControl = new FormControl('');
  basecode: FormControl = new FormControl('V', [Validators.required]);
  days: Leave[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private empService: EmployeeService
  ) { 
    this.requestForm = fb.group({
      start: this.startControl,
      end: this.endControl,
      comment: this.newcomment,
      code: this.basecode
    });
  }

  ngOnInit(): void {
  }

  setLeaveRequest() {
    if (this.leaverequest.comments) {
      this.leaverequest.comments.sort((a,b) => b.compareTo(a));
    }
    if (this.leaverequest.days) {
      this.leaverequest.days.sort((a,b) => a.compareTo(b));
    }
    this.startControl.setValue(this.leaverequest.start_date);
    this.endControl.setValue(this.leaverequest.end_date);
    this.basecode.setValue("V");
    this.days = new Array();
    if (this.leaverequest.days && this.leaverequest.days.length 
        && this.leaverequest.id !== 'new') {
      this.leaverequest.days.sort((a,b) => a.compareTo(b));
      let startDay = new Date(this.leaverequest.days[0].leave_date);
      console.log(startDay);
      let endDay = new Date(this.leaverequest.days[
        this.leaverequest.days.length - 1].leave_date);
      while (startDay.getDay() !== 0) {
        startDay = new Date(startDay.getTime() - (24 * 3600000));
      }
      while (endDay.getDay() !== 6) {
        endDay = new Date(endDay.getTime() + (24 * 3600000));
      }
      
      while (startDay <= endDay) {
        let found = false;
        this.leaverequest.days.forEach(lv => {
          if (lv.dateEqual(startDay)) {
            this.days.push(lv);
            found = true;
          }
        });
        if (!found) {
          let lv = new Leave();
          lv.leave_date = new Date(startDay);
          lv.code = "";
          lv.hours = 0;
          lv.leave_request_id = this.leaverequest.id;
          this.days.push(lv);
        }
        startDay = new Date(startDay.getTime() + (24 * 3600000));
      }
    }
  }

  getComment(cmt: LeaveRequestComment): string {
    let months = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
      "Aug", "Sep", "Oct", "Nov", "Dec");
    return `${cmt.comment_date.getDate()} ${months[cmt.comment_date.getMonth()]} `
      + `${cmt.comment_date.getFullYear() % 100} - ${cmt.comment}`;
  }

  updateRequest() {
    if (!this.leaverequest.id) { this.leaverequest.id = ""; }
    this.empService.updateLeaveRequest(this.leaverequest.id, this.employee.id,
      this.startControl.value, this.endControl.value, this.basecode.value,
      this.newcomment.value).subscribe( lr => {
        this.leaverequest = new LeaveRequest(lr);
        let found = false;
        for (let i=0; i < this.employee.leaveRequests.length && !found; i++) {
          if (this.employee.leaveRequests[i].id === lr.id) {
            this.employee.leaveRequests[i] = new LeaveRequest(lr);
            found = true;
          }
        }
        if (!found) {
          this.employee.leaveRequests.push(new LeaveRequest(lr));
        }

        let user = this.authService.getUser();
        if (user) {
          console.log(user);
          if (user.id === this.employee.id) {
            this.authService.setUser(this.employee);
          }
        }
        this.authService.setUserInSite(this.employee);
        this.empchange.emit(this.employee);
      });
    
  }

  changeRequest(req: LeaveRequest) {
    let found = false;
      for (let i=0; i < this.employee.leaveRequests.length && !found; i++) {
        if (this.employee.leaveRequests[i].id === req.id) {
          this.employee.leaveRequests[i] = new LeaveRequest(req);
          found = true;
        }
      }
      if (!found) {
        this.employee.leaveRequests.push(new LeaveRequest(req));
      }
      this.leaverequest = new LeaveRequest(req);

      let user = this.authService.getUser();
      if (user) {
        console.log(user);
        if (user.id === this.employee.id) {
          this.authService.setUser(this.employee);
        }
      }
      this.authService.setUserInSite(this.employee);
      this.empchange.emit(this.employee);
  }
}
