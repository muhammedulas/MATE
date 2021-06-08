import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { GlobalService } from './services/global.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MATE';
  constructor(private global: GlobalService, private auth:AuthService) {
    this.global.sideNavActive.next(true);
    this.auth.sessionInfo.next(JSON.parse(localStorage.getItem('session')))
  }

  checkLoggedInState() {
    return this.auth.isLoggedIn
  }
}
