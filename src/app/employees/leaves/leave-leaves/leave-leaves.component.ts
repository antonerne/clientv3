import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Employee, IEmployee } from 'src/app/models/employee/employee';
import { LeaveGroup, LeaveMonth } from 'src/app/models/employee/leaves/leaveGroup';
import { ITeam, Team } from 'src/app/models/team/team';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-leave-leaves',
  templateUrl: './leave-leaves.component.html',
  styleUrls: ['./leave-leaves.component.scss']
})
export class LeaveLeavesComponent implements OnInit {
  private _team: Team = new Team();
  private _employee: Employee = new Employee();
  private _year: number = (new Date()).getFullYear();
  @Input() set team(value: ITeam) {
    this._team = new Team(value);
  }
  get team(): Team {
    return this._team;
  }
  @Input() set employee(value: IEmployee) {
    this._employee = new Employee(value);
    this.setLeaves();
  }
  get employee(): Employee {
    return this._employee;
  }
  @Input() set year(value: number) {
    this._year = value;
    this.setLeaves();
  }
  get year(): number {
    return this._year;
  }
  leaveMonths: LeaveMonth[] = [];
  balanceForm: FormGroup;
  carryover: FormControl = new FormControl('0.0', [Validators.required]);
  annualhours: FormControl = new FormControl('0.0', [Validators.required]);

  constructor(private fb: FormBuilder,
    private empService: EmployeeService,
    private authService: AuthService) { 
    this.balanceForm = this.fb.group({
      carryover: this.carryover,
      annualhours: this.annualhours
    });
  }

  ngOnInit(): void {
  }

  setLeaves() {
    this.leaveMonths = new Array();
    this.employee.leaves.sort((a,b) => a.compareTo(b));
    for (let i=0; i < 12; i++) {
      let start = new Date(this.year, i, 1);
      let end = new Date(this.year, i+1, 1);
      let lvMonth = new LeaveMonth(start);
      let currentCode = "";
      let currentDate: Date | null = null;
      let currentGroup: LeaveGroup = new LeaveGroup();
      this.employee.leaves.forEach(lv => {
        if (lv.code.toLowerCase() !== 'h' && lv.leave_date >= start 
          && lv.leave_date < end) {
          if (currentCode !== lv.code) {
            if (currentGroup.leaves.length > 0) {
              lvMonth.addLeaveGroup(currentGroup);
              currentGroup = new LeaveGroup()
            }
          } else if (!currentDate) {
            currentGroup = new LeaveGroup();
          } else if ((currentDate.getTime() + (24 * 3600000)) < lv.leave_date.getTime()) {
            if (currentGroup.leaves.length > 0) {
              lvMonth.addLeaveGroup(currentGroup)
              currentGroup = new LeaveGroup();
            }
          }
          currentCode = lv.code;
          currentDate = new Date(lv.leave_date);
          currentGroup.addLeave(lv);
        } 
      });
      if (currentGroup.leaves.length > 0) {
        lvMonth.addLeaveGroup(currentGroup);
      }
      this.leaveMonths.push(lvMonth);
    }
    this.leaveMonths.sort((a,b) => a.compareTo(b));
    this.carryover.setValue(this.getCarryover());
    this.annualhours.setValue(this.getAnnual());
  }

  getCarryover(): string {
    let answer = 0;
    this.employee.balances?.forEach(bal => {
      if (bal.year === this.year) {
        answer = bal.carryover;
      }
    });
    return answer.toFixed(1);
  }

  getAnnual(): string {
    let answer = 0;
    this.employee.balances?.forEach(bal => {
      if (bal.year === this.year) {
        answer = bal.annual_leave;
      }
    });
    return answer.toFixed(1);
  }

  getActualHours(): string {
    let start = new Date(this.year, 1, 1);
    let end = new Date(this.year + 1, 1, 1);
    let answer = 0;
    this.employee.leaves.forEach(lv => {
      if ((lv.code.toLowerCase() === 'p' || lv.code.toLowerCase() === 'v')
        && lv.leave_date >= start && lv.leave_date < end
        && lv.status.toLowerCase() === 'actual') {
        answer += lv.hours;
      }
    });
    return answer.toFixed(1);
  }

  getPlannedHours(): string {
    let start = new Date(this.year, 1, 1);
    let end = new Date(this.year + 1, 1, 1);
    let answer = 0;
    this.employee.leaves.forEach(lv => {
      if ((lv.code.toLowerCase() === 'p' || lv.code.toLowerCase() === 'v')
        && lv.leave_date >= start && lv.leave_date < end
        && lv.status.toLowerCase() !== 'actual') {
        answer += lv.hours;
      }
    });
    return answer.toFixed(1);
  }

  getPTOBalance(): string {
    let start = new Date(this.year, 1, 1);
    let end = new Date(this.year + 1, 1, 1);
    let answer = 0;
    this.employee.balances?.forEach(bal => {
      if (bal.year === this.year) {
        answer = bal.annual_leave + bal.carryover;
      }
    });
    this.employee.leaves.forEach(lv => {
      if ((lv.code.toLowerCase() === 'p' || lv.code.toLowerCase() === 'v')
        && lv.leave_date >= start && lv.leave_date < end) {
        answer -= lv.hours;
      }
    });
    return answer.toFixed(1);
  }

  updateBalance(field: string) {
    this.authService.showProgress = true;
    this.authService.statusMessage = "Updating Employee Leave Balance";
    let value = "";
    let subfield = 'annual'
    if (field.toLowerCase() === 'annualhours') {
      value = `${this.year}|${this.annualhours.value}`;
    } else {
      subfield = 'carryover';
      value = `${this.year}|${this.carryover.value}`;
    }

    this.empService.updateEmployee(this.employee.id, 'balance', subfield, value)
      .subscribe({
        next: (data) => {
          this.authService.showProgress = false;
          this.authService.statusMessage = "Employee Leave Balance Updated";
          this.employee = new Employee(data);
          var user = this.authService.getUser();
          if (user) {
            if (user.id === this.employee.id) {
              this.authService.setUser(data);
            }
            this.authService.setUserInSite(data);
          }
        },
        error: (error) => {
          this.authService.showProgress = false;
          let errorMessage = "";
          if (error.error.error) {
            errorMessage = error.error.error;
          } else if (error.error.message) {
            errorMessage = error.error.message;
          } else {
            errorMessage = "Unknown Update Error";
          }
          this.authService.statusMessage = errorMessage;
        }
      });
  }
}
