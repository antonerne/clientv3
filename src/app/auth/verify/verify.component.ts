import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  verifyForm: FormGroup;
  verifyError = '';
  redirectUrl = "";
  email = new FormControl(this.authService.currentEmail, [
    Validators.required, Validators.email
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
    this.verifyForm = this.formBuilder.group({
      email: this.email,
      password: this.passcode,
    })
   }

  ngOnInit(): void {
  }
  
  verify() {
    this.verifyError = '';
    this.authService.showProgress = true;
    this.authService.statusMessage = "Logging In";
    this.authService.verify(this.email.value,
      this.passcode.value)
      .subscribe({
        next: (data) => {
          this.authService.showProgress = false;
          this.authService.statusMessage = data.message;
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.authService.showProgress = false;
          if (error.error.message) {
            this.verifyError = error.error.message;
          }
        }
      });
  }


}
