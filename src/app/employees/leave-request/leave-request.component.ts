import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { IEmployee, Employee } from 'src/app/models/employee/employee';
import { LeaveRequest } from 'src/app/models/employee/leaves/leaveRequest';
import { Team } from 'src/app/models/team/team';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss']
})
export class LeaveRequestComponent implements OnInit {
  private _employee: Employee = new Employee();
  @Input() set employee(value: IEmployee) {
    this._employee = new Employee(value);
    this.setEmployee();
  }
  get employee(): Employee {
    return this._employee;
  }
  team: Team;
  public leaveRequest: LeaveRequest;

  constructor(
    private authService: AuthService
  ) { 
    let tm = this.authService.getTeam();
    if (tm) {
      this.team = new Team(tm);
      this.team.displayCodes?.sort((a,b) => a.compareTo(b));
    } else {
      this.team = new Team();
    }
    if (this.employee.id === "") {
      let user = this.authService.getUser();
      if (user) {
        this.employee = new Employee(user);
      }
    }
    this.leaveRequest = new LeaveRequest();
    this.leaveRequest._id = "new";
  }

  ngOnInit(): void {
  }

  setEmployee() {
    this.employee.leaveRequests.sort((a,b) => a.compareTo(b));
  }

  setLeaveRequest(id: string) {
    this.leaveRequest = new LeaveRequest();
    this.employee.leaveRequests.forEach(lr => {
      if (lr._id && lr._id === id) {
        this.leaveRequest = new LeaveRequest(lr);
      }
    });
  }

  updateLeaveRequest(req: LeaveRequest) {
    let found = false;
    for (let i=0; i < this.employee.leaveRequests.length && !found; i++) {
      if (req._id === this.employee.leaveRequests[i]._id) {
        found = true;
        this.employee.leaveRequests[i] = new LeaveRequest(req);
      }
    }
    if (!found) {
      this.employee.leaveRequests.push(new LeaveRequest(req));
      this.employee.leaveRequests.sort((a,b) => a.compareTo(b));
    }
    let emp = this.authService.getUser();
    if (emp) {
      if (emp.id === this.employee.id) {
        this.authService.setUser(this.employee);
      }
    }
    this.authService.setUserInSite(this.employee);
  }
}
