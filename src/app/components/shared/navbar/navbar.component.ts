import { Component, Inject, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { GlobalService } from 'src/app/services/global.service';
import { AuthService } from 'src/app/services/auth.service';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private global:GlobalService, private auth:AuthService, private main:MainComponent) { }

  ngOnInit() {
  }

  logout(){
    this.auth.logout();
  }

  toggleAnnouncementPanel(){
    this.main.announcementPanelActive = !this.main.announcementPanelActive;
  }

  toggleSideNav(){
    this.main.sideNavActive = !this.main.sideNavActive;
  }
}
