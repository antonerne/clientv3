import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Employee, IEmployee } from 'src/app/models/employee/employee';
import { Team } from 'src/app/models/team/team';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  team: Team = new Team();
  private _employee: Employee = new Employee();
  @Input() set employee(value: IEmployee) {
    this._employee = new Employee(value);
  }
  get employee(): IEmployee {
    return this._employee;
  }

  constructor(private authService: AuthService) { 
    let tm = this.authService.getTeam();
    if (tm) {
      this.team = new Team(tm);
    }
  }

  ngOnInit(): void {
  }

}
