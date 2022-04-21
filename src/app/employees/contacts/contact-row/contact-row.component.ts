import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Employee } from 'src/app/models/employee/employee';
import { Contact } from 'src/app/models/employee/employeeInfo/companyInfo';
import { ContactType } from 'src/app/models/team/contacts';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-contact-row',
  templateUrl: './contact-row.component.html',
  styleUrls: ['./contact-row.component.scss']
})
export class ContactRowComponent implements OnInit {
  private _contactType: ContactType = new ContactType();
  employee: Employee = new Employee();
  contactInput: FormControl = new FormControl('',[Validators.required]);
  contactForm: FormGroup;
  profileError: string = "";
  @Input() set contacttype(value: ContactType) {
    this._contactType = value;
    this.setContact();
  }
  get contacttype(): ContactType {
    return this._contactType;
  }

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private empService: EmployeeService) {
    let user = this.authService.getUser();
    if (user) {
      this.employee = new Employee(user);
    }
    this.contactForm = this.fb.group({
      contact: this.contactInput,
    });
  }

  changeForm() {
    if (this.contactForm.valid) {
      this.authService.showProgress = true;
      this.empService.updateEmployee("contact", this._contactType.code, 
        this.contactInput.value).subscribe({
          next: (data) => {
            this.authService.showProgress = false;
            this.authService.statusMessage = "Employee Updated";
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

  setContact() {
    this.contactInput.setValue(this.getContact());
  }

  ngOnInit(): void {
  }

  isRequired(): boolean {
    return this._contactType.is_required;
  }

  getContact(): string {
    return this.employee.getContactByCode(this._contactType.code);
  }
}
