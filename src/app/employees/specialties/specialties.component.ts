import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Employee, IEmployee } from 'src/app/models/employee/employee';
import { Team } from 'src/app/models/team/team';

@Component({
  selector: 'app-specialties',
  templateUrl: './specialties.component.html',
  styleUrls: ['./specialties.component.scss']
})
export class SpecialtiesComponent implements OnInit {
  private _employee: Employee = new Employee();
  @Input() set employee(value: IEmployee) {
    this._employee = new Employee(value);
  }
  get employee(): Employee {
    return this._employee;
  }
  team: Team = new Team();

  constructor(
    private authService: AuthService
  ) { 
    if (this.employee.id === "") {
      let user = this.authService.getUser();
      if (user) {
        this.employee = new Employee(user);
      }
    }
    let tm = this.authService.getTeam();
    if (tm) {
      this.team = new Team(tm);
    }
  }

  ngOnInit(): void {
  }

}
