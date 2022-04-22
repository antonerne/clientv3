import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Employee, IEmployee } from 'src/app/models/employee/employee';
import { ISpecialty, Specialty } from 'src/app/models/team/specialties';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-specialty-item',
  templateUrl: './specialty-item.component.html',
  styleUrls: ['./specialty-item.component.scss']
})
export class SpecialtyItemComponent implements OnInit {
  private _employee: Employee = new Employee();
  private _specialty: Specialty = new Specialty();
  @Input() set employee(value: IEmployee) {
    this._employee = new Employee(value);
    this.setLevel();
  }
  get employee(): Employee {
    return this._employee;
  }
  @Input() set specialty(value: ISpecialty) {
    this._specialty = new Specialty(value);
    this.setLevel();
  }
  get specialty(): Specialty {
    return this._specialty;
  }
  itemForm: FormGroup;
  itemControl: FormControl = new FormControl(false)
  profileError: string = "";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private empService: EmployeeService) 
  {
    this.itemForm = fb.group({
      itemControl: this.itemControl
    })
  }

  ngOnInit(): void {
  }

  levelUpdate() {
    let value = (this.itemControl.value) ? "true" : "false";
    this.authService.showProgress = true;
    this.authService.statusMessage = "Updating Employee Specialty";
    this.empService.updateEmployee(this.employee.id, "specialty",
      this.specialty.code, value).subscribe({
        next: (data) => {
          this.authService.showProgress = false;
          this.authService.statusMessage = "Employee Updated";
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
          if (error.error.error) {
            this.profileError = error.error.error;
          } else if (error.error.message) {
            this.profileError = error.error.message;
          } else {
            console.log(error);
            this.profileError = "Unknown Update Error";
          }
          this.authService.statusMessage = this.profileError;
        }
      })
  }

  setLevel() {
    let lvl = this.employee.getSpecialtyLevel(this.specialty.code);
    this.itemControl.setValue(lvl);
  }
}
