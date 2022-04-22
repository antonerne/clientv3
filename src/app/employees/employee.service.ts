import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Employee, IEmployee } from '../models/employee/employee';
import { Site, ISite } from '../models/site/site';
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
      /*.pipe<IEmployee>()/*map<((resp: IEmployee) => {
        var user = this.getItem<IEmployee>('user');
        if (user) {
          if (user.id === resp.id) {
            this.setItem('user', resp);
          }
        }
        let site = this.getItem<ISite>('site');
        if (site && site.employees) {
          let found = false;
          for (let i=0; i < site.employees.length && !found; i++) {
            if (site.employees[i].id === resp.id) {
              site.employees[i] = resp;
              found = true;
            }
          }
          if (!found) {
            site.employees.push(resp);
          }
          this.setItem('site', site);
        }
      }));*/
  }
}
