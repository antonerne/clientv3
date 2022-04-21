import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Team } from 'src/app/models/team/team';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  team: Team = new Team();

  constructor(private authService: AuthService) { 
    let tm = this.authService.getTeam();
    if (tm) {
      this.team = new Team(tm);
    }
  }

  ngOnInit(): void {
  }

}
