import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { twoOfEachPassword } from 'src/app/utilities/common';
import { PasswordValidation } from 'src/app/utilities/must-match.directive';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  forgotForm: FormGroup;
  forgotError = '';

  email = new FormControl(this.authService.currentEmail, [
    Validators.required, Validators.email]);
  newpassword = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(30),
    twoOfEachPassword()
  ]);
  verify = new FormControl('', [
    Validators.required, PasswordValidation.MatchPassword
  ]);
  passcode = new FormControl('', [
    Validators.required,
  ]);

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.forgotForm = this.formBuilder.group({
      email: this.email,
      newpassword: this.newpassword,
      verify: this.verify,
      passcode: this.passcode
    })
   }

  ngOnInit(): void {
  }

  forgot() {
    this.authService.showProgress = true;
    this.authService.statusMessage = "Resetting Password";
    this.authService.forgot(this.email.value,
      this.newpassword.value, this.passcode.value)
      .subscribe({
        next: (data) => {
          this.authService.showProgress = false;
          this.authService.statusMessage = "Password Reset, Logged In";
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.authService.showProgress = false;
          if (error.error.message === "Account Not Verified") {
            this.authService.statusMessage = error.error.message
              + ": Check email for verification message";
            this.authService.currentEmail = this.email.value;
            this.router.navigate(['/verify']);
          } else {
            this.authService.statusMessage = "Reset Password Error"
            if (error.error.error) {
              this.forgotError = error.error.error;
            } else if (error.error.message) {
              this.forgotError = error.error.message;
            }
          }
        }
      });
  }
}
