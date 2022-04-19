import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  }
}
