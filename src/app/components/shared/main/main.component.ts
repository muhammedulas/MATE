import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatList } from '@angular/material/list';
import { MatButton } from '@angular/material/button';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { MatTooltip } from '@angular/material/tooltip';
import { GlobalService } from 'src/app/services/global.service';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import { announcement_general } from 'src/app/models/announcement_general';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {
  public sideNavActive = true;
  public announcementPanelActive = false;
  public showAdminNav: boolean;
  public announcements = [];

  constructor(private auth: AuthService, private general: GeneralService, private toast: ToastService) {
    
  }

  ngOnInit() {
    this.getAnnouncements();
    this.showAdminNav = this.auth.isAdmin
  }

  checkRole() {
    return this.auth.isAdmin
  }

  getAnnouncements() {
    this.general.getAnnouncements().subscribe(res => {
      res.CompanyAnnouncements.forEach(a => {
        this.announcements.push(a)
      })
      res.TeamAnnouncements.forEach(a => {
        this.announcements.push(a)
      })
      res.DepartmentAnnouncements.forEach(a => {
        this.announcements.push(a)
      })
    })
  }

  toggleAnnouncementPanel() {
    this.announcementPanelActive = !this.announcementPanelActive
  }

  toggleSideNav() {
    this.sideNavActive = !this.sideNavActive
  }

  test(c) {
    this.toast.success_top_center(c, 3)
  }


}
