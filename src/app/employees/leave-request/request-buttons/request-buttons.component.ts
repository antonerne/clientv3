import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Employee } from 'src/app/models/employee/employee';
import { LeaveRequest } from 'src/app/models/employee/leaves/leaveRequest';

@Component({
  selector: 'app-request-buttons',
  templateUrl: './request-buttons.component.html',
  styleUrls: ['./request-buttons.component.scss']
})
export class RequestButtonsComponent implements OnInit {
  private _employee: Employee = new Employee();
  @Input() set employee(value: Employee) {
    this._employee = new Employee(value);
    this.setEmployee();
  }
  get employee(): Employee {
    return this._employee;
  }

  @Output() showrequest = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  setEmployee() {
    this.employee.leaveRequests.sort((a,b) => b.compareTo(a));
  }

  showLeaveRequest(req: LeaveRequest): boolean {
    let now = new Date();
    return (req.end_date.getTime() >= now.getTime());
  }

  getColor(req: LeaveRequest): string {
    let answer = "accent"; // requested or new request
    if (req.status.toLowerCase() === 'approved') {
      answer = "primary";
    } else if (req.status.toLowerCase() === "deleted") {
      answer = "warn";
    }
    return answer;
  }

  getButtonLabel(req: LeaveRequest): string {
    let months = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
      "Aug", "Sep", "Oct", "Nov", "Dec");
    if (req.start_date.getMonth() === req.end_date.getMonth()) {
      return `${req.start_date.getDate()}-${req.end_date.getDate()} `
        + `${months[req.start_date.getMonth()]} (${req.start_date.getFullYear()})`;
    } else if (req.start_date.getFullYear() === req.end_date.getFullYear()) {
      return `${req.start_date.getDate()} ${months[req.start_date.getMonth()]} - `
        + `${req.end_date.getDate()} ${months[req.end_date.getMonth()]} `
        + `(${req.start_date.getFullYear()})`;
    } else {
      return `${req.start_date.getDate()} ${months[req.start_date.getMonth()]} `
        + ` ${req.start_date.getFullYear() % 100} - `
        + `${req.end_date.getDate()} ${months[req.end_date.getMonth()]} `
        + `${req.end_date.getFullYear() % 100}`;
    }
  }

  setRequestDisplay(value: LeaveRequest | null) {
    if (value) {
      this.showrequest.emit(value.id);
    } else {
      this.showrequest.emit("new");
    }
  }
}
