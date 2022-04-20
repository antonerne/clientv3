import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/employees/employee.service';
import { twoOfEachPassword } from 'src/app/utilities/common';
import { PasswordValidation } from 'src/app/utilities/must-match.directive';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-mustchange',
  templateUrl: './mustchange.component.html',
  styleUrls: ['./mustchange.component.scss']
})
export class MustchangeComponent implements OnInit {

  mustChangeForm: FormGroup;
  forgotError = '';

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
    private empService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.mustChangeForm = this.formBuilder.group({
      newpassword: this.newpassword,
      verify: this.verify
    })
   }

  ngOnInit(): void {
  }

  change() {
    var user = this.authService.getUser();
    this.authService.showProgress = true;
    this.authService.statusMessage = "Changing Password";
    this.empService.updateEmployee("password", "", this.newpassword.value)
      .subscribe({
        next: (data) => {
          this.authService.showProgress = false;
          this.authService.statusMessage = "Password Updated";
          this.router.navigate(['/employee/home']);
        },
        error: (error) => {
          console.log(error);
          this.authService.showProgress = false;
          this.authService.statusMessage = '';
          if (error.error.error) {
            this.forgotError = error.error.error;
          } else if (error.error.message) {
            this.forgotError = error.error.message;
          } else {
            this.forgotError = "Unknown Error Occurred";
          }
        }
      })
  }
}
