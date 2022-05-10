import { Employee } from "../employee/employee";
import { Site } from "../site/site";
import { Team } from "../team/team";

export interface LoginResponse {
    team: Team;
    site: Site;
    user: Employee;
    token: Token;
}

export interface Token {
    id: string;
    expires: Date;
    tokenString: string;
}