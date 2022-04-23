import { Component, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import { MatIconRegistry } from '@angular/material/icon'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { MenuService } from './services/menu-service.service';
import { MatAccordion } from '@angular/material/expansion';
import { Team } from './models/team/team';
import { Site } from './models/site/site';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Osan Scheduler';

  constructor(iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer, 
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public menuService: MenuService) {
    iconRegistry.addSvgIcon('scheduler', 
    sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/calendar.svg'));
    var token = authService.getToken();
    if (!token || token == "") {
      this.router.navigate(['/login']);
    } else {
      var user = this.authService.getUser();
      var expires = this.authService.getUserExpires();
      let now = new Date();
      if (expires) {
        let userExp = new Date(expires);
        if (userExp.getTime() > now.getTime()) {
          if (user) {
            this.menuService.getMenus(user.roles);
          } else {
            this.menuService.clearMenus();
          }
          this.router.navigate(['/home']);
        } else {
          this.logout();
        }
      }
    }
    var tm = authService.getTeam();
    var st = authService.getSite();
    if (tm) {
      let team = new Team(tm);
      this.title = team.name;
      if (st) {
        let site = new Site(st);
        this.title += " - " + site.title;
      }
    }
  }

  logout() {
    this.authService.logout();
    this.menuService.clearMenus();
    this.router.navigate(['/login']);
  }
}
