import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from '../services/cache-service';
import jwt_decode from 'jwt-decode';
import { map, tap } from 'rxjs/operators'
import { Employee, Site } from 'tsched-models';
import { LoginResponse, Message } from '../models/Login';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends CacheService {
  isAuthenticated = false;
  mustChange = false;
  showProgress = false;
  statusMessage = "footer";
  currentEmail = '';

  constructor(private http: HttpClient, private router: Router) {
    super();
    this.getToken();
  }

  getToken(): string | null {
    var token = this.getItem('jwt');
    this.isAuthenticated = (token) ? true : false;
    return this.getItem('jwt');
  }

  clearToken() {
    this.removeItem('jwt');
    this.removeItem('team');
    this.removeItem('teamid');
    this.removeItem('site');
    this.removeItem('user');
  }

  getTeam(): string | null {
    return this.getItem('team');
  }

  getTeamID(): string | null {
    return this.getItem('teamid');
  }

  getSite(): Site | null {
    return this.getItem('site');
  }

  getUser(): Employee | null {
    return this.getItem('user');
  }
  
  getDecodedToken(): IAuthStatus {
    var sToken = this.getItem<string|null>('jwt');
    if (sToken) {
        let token: IAuthStatus = jwt_decode(sToken);
        if (token.userid && token.userid.substring(0,4) === '<nil') {
          return defaultAuthStatus;
        }
        return token;
    }
    return defaultAuthStatus;
  }

  login(email: string, password: string) {
    var address = '/api/v2/Employees/authenticate';
    return this.http.post<LoginResponse>(address, 
      {"email": email, "password":password})
      .pipe(map(resp => {
        this.setItem('jwt', resp.token);
        this.isAuthenticated = true;
        this.setItem('team', resp.team);
        this.setItem('teamid', resp.teamid);
        this.setItem('site', resp.site);
        this.setItem('user', resp.user);
        this.mustChange = resp.user.creds.must_change;
        this.showProgress = false;
      }));
  }

  logout() {
    this.clearToken();
    this.isAuthenticated = false;
    this.mustChange = false;
  }

  verify(email: string, passcode: string) {
    var address = '/api/v2/Employees/verify';
    return this.http.put<Message>(address, 
      {"email": email, "verifytoken":passcode});
  }
}

export interface IAuthStatus {
  userid: string
  email: string
  uuid: string
}

const defaultAuthStatus = { userid: "",email: "", uuid: "" }
