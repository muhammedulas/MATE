import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MainComponent } from '../components/shared/main/main.component';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public sideNavActive = new Subject<boolean>();
  constructor(private auth:AuthService, private main:MainComponent) {
  }

  toggleAnnouncementPanel(){
    this.main.announcementPanelActive = !this.main.announcementPanelActive
  }

  toggleSideNav(){
    this.main.sideNavActive = !this.main.sideNavActive
  }

}
