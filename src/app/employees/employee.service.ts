import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Employee, IEmployee } from '../models/employee/employee';
import { ILeaveRequest } from '../models/employee/leaves/leaveRequest';
import { Site, ISite } from '../models/site/site';
import { Team } from '../models/team/team';
import { NewEmployeeResponse } from '../models/utilities/Login';
import { CacheService } from '../services/cache-service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends CacheService {

  constructor(private http: HttpClient) {
    super();
  }

  updateEmployee(id: string, field: string, subfield: string, value: string): Observable<IEmployee> {
    var address = '/api/v2/Employees';
    var req = {"id": id, "field": field, "subfield": subfield,
        "value": value};
    return this.http.put<IEmployee>(address, req);
  }

  updateLeaveRequest(id: string, employee: string, start: Date, end: Date,
    code: string, comment: string): Observable<ILeaveRequest> {
    let req = {"id": id, "employee": employee, "startdate": start, 
      "enddate": end, "code": code, "comment": comment };
    let address = "/api/v2/Employees/leaverequest";
    return this.http.put<ILeaveRequest>(address, req);
  }

  updateLeaveRequestDay(id: string, employee: string, leavedate: Date, 
    field: string, value: string): Observable<ILeaveRequest> {
    let req = { "id": id, "employee": employee, "leavedate": leavedate, 
      "field": field, "value": value};
    let address = "/api/v2/Employees/leaverequest/day";
    return this.http.put<ILeaveRequest>(address, req);
  }

  getSiteEmployees(): Observable<Employee[]> {
    let team = this.getItem<Team>('team');
    let site = this.getItem<Site>('site');
    if (team && site) {
      let address = `/api/v2/Employees/site/${team.id}/${site.code}`;
      return this.http.get<Employee[]>(address);
    }
    return of([]);
  }
}
