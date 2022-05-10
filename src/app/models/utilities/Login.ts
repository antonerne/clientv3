import { IEmployee } from "../employee/employee";
import { ISite } from "../site/site";
import { ITeam } from "../team/team";
import { Token } from "./authenticateResponse";

export interface LoginResponse {
    team: ITeam;
    site: ISite;
    user: IEmployee;
    token: Token;
}

export interface Message {
    message: string;
}

export interface NewEmployeeResponse {
    employee: IEmployee
}