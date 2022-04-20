import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Employee } from 'src/app/models/employee/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employee: Employee;

  constructor(private authService: AuthService) 
  { 
    var user = this.authService.getUser();
    if (user) {
      this.employee = new Employee(user);
    } else {
      this.employee = new Employee();
    }
  }

  ngOnInit(): void {
  }

}
