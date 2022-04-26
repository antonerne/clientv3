import { Component, Input, OnInit } from '@angular/core';
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
  @Input() employeeid: string = '';
  private _leaveRequest: LeaveRequest = new LeaveRequest();
  @Input() set leaverequest(value: LeaveRequest) {
    this._leaveRequest = new LeaveRequest(value);
    this.setLeaveRequest();
  }
  get leaverequest(): LeaveRequest {
    return this._leaveRequest;
  }
  @Input() team: Team = new Team();
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
    if (this.leaverequest.days && this.leaverequest._id !== 'new') {
      this.leaverequest.days.sort((a,b) => a.compareTo(b));
      let start = this.leaverequest.days[0].leave_date;
      let end = this.leaverequest.days[this.leaverequest.days.length - 1].leave_date;
      while (start.getDay() !== 0) {
        start = new Date(start.getTime() - (24 * 3600000));
      }
      while (end.getDay() !== 6) {
        end = new Date(end.getTime() + (24 * 3600000));
      }
      while (start <= end) {
        let found = false;
        this.leaverequest.days.forEach(lv => {
          if (lv.dateEqual(start)) {
            this.days.push(lv);
            found = true;
          }
        });
        if (!found) {
          let lv = new Leave();
          lv.leave_date = new Date(start);
          lv.code = "";
          lv.hours = 0;
          lv.leave_request_id = this.leaverequest._id;
          this.days.push(lv);
        }
        start = new Date(start.getTime() + (24 * 3600000));
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
    if (!this.leaverequest._id) { this.leaverequest._id = ""; }
    this.empService.updateLeaveRequest(this.leaverequest._id, this.employeeid,
      this.startControl.value, this.endControl.value, this.basecode.value,
      this.newcomment.value).subscribe( lr => {
        this.leaverequest = new LeaveRequest(lr);
        let s = this.authService.getSite();
        let user = this.authService.getUser();
        let employee = new Employee();
        if (user) {
          employee = new Employee(user)
        }
        if (s) {
          let site = new Site(s);
          let found = false;
          if (site.employees) {
            for (let i=0; i < site.employees?.length && !found; i++) {
              if (site.employees[i].id === this.employeeid) {
                let emp = new Employee(site.employees[i]);
                for (let j=0; j < emp.leaveRequests.length && !found; j++) {
                  if (emp.leaveRequests[j]._id === lr._id) {
                    found = true;
                    emp.leaveRequests[j] = new LeaveRequest(lr);
                  }
                }
                if (!found) {
                  emp.leaveRequests.push(new LeaveRequest(lr));
                }
                if (employee.id === this.employeeid) {
                  this.authService.setUser(employee);
                }
                site.employees[i] = emp;
              }
            }
          }
          this.authService.setSite(site);
        }
      });
    
  }
}
