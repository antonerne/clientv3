import { Employee, Site } from 'tsched-models';

export interface LoginResponse {
    team: string;
    teamid: string;
    site: Site;
    user: Employee;
    mustchange: boolean;
    token: string;
}

export interface Message {
    message: string;
}

export interface NewEmployeeResponse {
    employee: Employee
}