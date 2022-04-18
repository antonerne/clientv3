import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import { MatIconRegistry } from '@angular/material/icon'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './employees/auth.service';

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
    private router: Router) {
    iconRegistry.addSvgIcon('scheduler', 
    sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/calendar.svg'));
    var token = authService.getToken();
    if (!token || token == "") {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  logout() {
    this.authService.logout();
  }
}
