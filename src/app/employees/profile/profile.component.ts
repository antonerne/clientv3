import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Employee } from 'src/app/models/employee/employee';
import { Team } from 'src/app/models/team/team';
import { twoOfEachPassword } from 'src/app/utilities/common';
import { PasswordValidation } from 'src/app/utilities/must-match.directive';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  changePasswordForm: FormGroup;
  profileError: string = "";
  employee: Employee;
  team: Team;
  showPasswordChange: boolean = false;
  newpassword = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(30),
    twoOfEachPassword()
  ]);
  verify = new FormControl('', [
    Validators.required, PasswordValidation.MatchPassword
  ]);

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private empService: EmployeeService
  ) { 
    const now = new Date();
    this.profileForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      middlename: '',
      lastname: ['', [Validators.required]],
      namesuffix: '',
      nickname: '',
      email: ['', [Validators.required, Validators.email]],
      company: ['', [Validators.required]],
      employeeid: ['', [Validators.required]],
      alternateid: '',
      rank: '',
      division: '',
      costcenter: ''
    });
    this.changePasswordForm = this.formBuilder.group({
      newpassword: this.newpassword,
      verify: this.verify
    });
    var tm = this.authService.getTeam();
    if (tm) {
      this.team = new Team(tm);
    } else {
      this.team = new Team();
    }
    var emp = this.authService.getUser();
    if (emp) {
      this.employee = new Employee(emp);
      this.setEmployee();
    } else {
      this.employee = new Employee();
    }
  }

  ngOnInit(): void {
  }

  setEmployee() {
    if (this.employee) {
        this.profileForm.controls["firstname"].setValue(this.employee.name.first);
        this.profileForm.controls["middlename"].setValue(this.employee.name.middle);
        this.profileForm.controls["lastname"].setValue(this.employee.name.last);
        this.profileForm.controls["namesuffix"].setValue(this.employee.name.suffix);
        this.profileForm.controls["nickname"].setValue(this.employee.name.nickname);
        this.profileForm.controls["email"].setValue(this.employee.email);
        this.profileForm.controls["company"].setValue(this.employee.companyinfo.company_code);
        this.profileForm.controls["employeeid"].setValue(this.employee.companyinfo.company_employee_id);
        this.profileForm.controls["alternateid"].setValue(this.employee.companyinfo.company_alternate_id);
        this.profileForm.controls["rank"].setValue(this.employee.companyinfo.rank);
        this.profileForm.controls["division"].setValue(this.employee.companyinfo.division);
        this.profileForm.controls["costcenter"].setValue(this.employee.companyinfo.cost_center);
        this.newpassword.setValue('');
        this.verify.setValue('');
    }
  }

  showPassword() {
    this.showPasswordChange = true;
  }

  cancelPasswordChange() {
    this.showPasswordChange = false;
  }

  changeForm(field:string) {
    if (!this.profileForm.controls[field].errors) {
      this.authService.showProgress = true;
      this.authService.statusMessage = "Updating Employee";
      this.profileError = '';
      var subfield: string = "";
      const value = this.profileForm.controls[field].value;
      if (field.indexOf("name") >= 0) {
        subfield = field;
        field = "name";
      }
      this.empService.updateEmployee(field, subfield, value)
        .subscribe({
          next: (data) => {
            this.authService.showProgress = false;
            if (field === "email") {
            } else {
              this.authService.statusMessage = "Employee Updated";
            }
            var user = this.authService.getUser();
            if (user) {
              this.employee = new Employee(user);
              this.setEmployee();
            }
          },
          error: (error) => {
            this.authService.showProgress = false;
            if (error.error.error) {
              this.profileError = error.error.error;
            } else if (error.error.message) {
              this.profileError = error.error.message;
            } else {
              this.profileError = "Unknown Update Error";
            }
            this.authService.statusMessage = this.profileError;
          }
        });
      
    } else {
        console.log(this.profileForm.controls[field].errors);
    }
  }

  submitPassword() {
    var passwd = this.newpassword.value;
    var field = "password";
    this.authService.showProgress = true;
    this.authService.statusMessage = "Updating Employee";
    this.profileError = '';
    this.empService.updateEmployee(field, '', passwd)
      .subscribe({
        next: (data) => {
          this.authService.showProgress = false;
          this.authService.statusMessage = "Password Changed";
          var user = this.authService.getUser();
          if (user) {
            this.employee = new Employee(user);
            this.setEmployee();
            this.showPasswordChange = false;
          }
        },
        error: (error) => {
          this.authService.showProgress = false;
          if (error.error.error) {
            this.profileError = error.error.error;
          } else if (error.error.message) {
            this.profileError = error.error.message;
          } else {
            this.profileError = "Unknown Update Error";
          }
          this.authService.statusMessage = this.profileError;
        }
      });
  }
}
