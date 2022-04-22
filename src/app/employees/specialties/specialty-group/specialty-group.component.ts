import { Component, Input, OnInit } from '@angular/core';
import { Employee, IEmployee } from 'src/app/models/employee/employee';
import { ISpecialtyGroup, SpecialtyGroup } from 'src/app/models/team/specialties';

@Component({
  selector: 'app-specialty-group',
  templateUrl: './specialty-group.component.html',
  styleUrls: ['./specialty-group.component.scss']
})
export class SpecialtyGroupComponent implements OnInit {
  private _employee: Employee = new Employee();
  private _specialtyGroup: SpecialtyGroup = new SpecialtyGroup();
  @Input() set group (value: ISpecialtyGroup) {
    this._specialtyGroup = new SpecialtyGroup(value)
  }
  get group(): SpecialtyGroup {
    return this._specialtyGroup;
  }
  @Input() set employee(value: IEmployee) {
    this._employee = new Employee(value);
  }
  get employee(): Employee {
    return this._employee;
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
