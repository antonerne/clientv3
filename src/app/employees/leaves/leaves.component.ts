import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Employee, IEmployee } from 'src/app/models/employee/employee';
import { Team } from 'src/app/models/team/team';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.scss']
})
export class LeavesComponent implements OnInit {
  yearForm: FormGroup
  team: Team;
  year: number = (new Date()).getFullYear();
  private _employee: Employee = new Employee();
  @Input() set employee(value: IEmployee) {
    this._employee = new Employee(value);
  }
  get employee(): Employee {
    return this._employee;
  }
  yearSelect: FormControl = new FormControl(this.year.toFixed(0));
  aYears = new Array();


  constructor(private authService: AuthService,
    private fb: FormBuilder) { 
    let tm = this.authService.getTeam();
    if (tm) {
      this.team = new Team(tm);
    } else {
      this.team = new Team();
    }
    let now = new Date();
    for (let i=-5; i < 2; i++) {
      this.aYears.push((now.getFullYear() + i).toFixed(0));
    }
    if (this.employee.id === "") {
      let user = this.authService.getUser();
      if (user) {
        this.employee = new Employee(user);
      }
    }
    this.yearForm = this.fb.group({
      yearselect: this.yearSelect
    })
    this.yearSelect.setValue(this.year.toFixed(0));
  }

  ngOnInit(): void {
  }

  changeYear(event: Event) {
    let value = (event.target as HTMLSelectElement).value
    this.year = Number(value);
  }

  showHolidays(): boolean {
    let answer = false;
    if (this.team.companies) {
      this.team.companies.forEach(co => {
        if (co.code.toLowerCase() 
          === this.employee.companyinfo.company_code.toLowerCase()) {
          if (co.holidays.length > 0) {
            answer = true;
          }
        }
      });
    }
    return answer;
  }

}
