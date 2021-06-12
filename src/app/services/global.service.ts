import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AdminComponent } from '../components/admin/admin.component';
import { MainComponent } from '../components/shared/main/main.component';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private date = new Date();
  public sideNavActive = new Subject<boolean>();
  constructor(private auth: AuthService, private main: MainComponent, private admin: AdminComponent) {
  }

  toggleAnnouncementPanel() {
    this.main.announcementPanelActive = !this.main.announcementPanelActive
  }

  toggleSideNav() {
    this.main.sideNavActive = !this.main.sideNavActive
  }

  reRouteAdmin() {
    this.admin.reRoute()
  }

  getLocalTime() {
    let month = (this.date.getUTCMonth() + 1).toString();
    let day = this.date.getUTCDate().toString();
    if (month.length == 1) month = '0' + month;
    if (day.length == 1) day = '0' + day;

    let time = this.date.getUTCFullYear() + '-' + month
      + '-' + day + ' ' + (this.date.getUTCHours() + 3)
      + ':' + this.date.getUTCMinutes() + ':' + this.date.getUTCSeconds()
      + '.' + this.date.getUTCMilliseconds()

    return time
  }
}
