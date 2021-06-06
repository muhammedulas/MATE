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
    this.global.sideNavActive.next(true)
  }

  checkLoggedInState() {
    return this.auth.isLoggedIn
  }
}
