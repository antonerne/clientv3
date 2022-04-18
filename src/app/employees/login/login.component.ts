import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError = '';
  redirectUrl = "";
  verifyToken = '';
  resetToken = '';
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(30),
  ])

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    })
   }

  ngOnInit(): void {
  }
  
  login() {
    this.loginError = '';
    this.authService.showProgress = true;
    this.authService.statusMessage = "Logging In";
    this.authService.login(this.email.value,
      this.password.value)
      .subscribe({
        next: (data) => {
          this.authService.showProgress = false;
          this.authService.statusMessage = "Logged In";
        },
        error: (error) => {
          this.authService.showProgress = false;
          if (error.error.message === "Account Not Verified") {
            this.authService.statusMessage = error.error.message
              + ": Check email for verification message";
            this.authService.currentEmail = this.email.value;
            this.router.navigate(['/verify']);
          } else {
            if (error.error.error) {
              this.loginError = error.error.error;
            } else if (error.error.message) {
              this.loginError = error.error.message;
            }
          }
        }
      });
  }

  logout() {
    this.authService.logout();
  }

  async forgotPassword() {
  }
}
