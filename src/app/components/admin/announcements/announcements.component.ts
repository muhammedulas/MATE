import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { announcement_general } from 'src/app/models/announcement_general';
import { department } from 'src/app/models/department';
import { team } from 'src/app/models/team';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { Dialog_confirmationComponent } from '../../commonDialogs/dialog_confirmation/dialog_confirmation.component';

export interface IAnnouncement {
  "scope"?: number;
  "isNew"?: boolean;
  "ANNID": number;
  "OWNER_ID": number;
  "DEPARTMENT_ID"?: number;
  "TEAM_ID"?: number;
  "COMPANY_ID"?: number;
  "CREATED_AT": string;
  "DEADLINE": string;
  "TITLE": string;
  "CONTENT": string;
}
@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {
  public createMode: boolean = false
  public announcements: IAnnouncement[] = [];
  public newAnnouncement: IAnnouncement;
  public teams: team[] = [];
  public deps: department[] = [];
  public dialogRef: MatDialogRef<any>;
  constructor(
    private svc: AdminService,
    private dateAdapter: DateAdapter<Date>,
    private auth: AuthService,
    private toast: ToastService,
    private dialog: MatDialog
  ) {
    this.dateAdapter.setLocale('fr-ca')
  }

  ngOnInit() {
    this.getAnnouncements();
    this.getOptions()
  }

  getAnnouncements() {
    this.svc.getAllAnnouncements().subscribe(res => {
      res = res.sort((a, b) => a.DEADLINE.localeCompare(b.DEADLINE))
      this.announcements = res
    })
  }

  getOptions() {
    let sTeams = this.svc.getTeams().subscribe(res => {
      this.teams = res
      sTeams.unsubscribe();

      let sDeps = this.svc.getDepartments().subscribe(res => {
        this.deps = res
        sDeps.unsubscribe();
      })
    })
  }

  initializeNewAnnouncement() {
    this.newAnnouncement = {
      "isNew": true,
      "ANNID": 0,
      "OWNER_ID": 0,
      "COMPANY_ID": 1,
      "CREATED_AT": "",
      "DEADLINE": "",
      "TITLE": "",
      "CONTENT": ""
    }
  }

  createAnnouncement() {
    this.initializeNewAnnouncement();
    this.announcements.unshift(this.newAnnouncement)
  }

  send() {
    this.announcements[0].OWNER_ID = this.auth.userId
    this.svc.createAnnouncement(this.announcements[0]).subscribe(res => {
      if (res.OK == true) {
        this.toast.success_bot_center(res.message, 3)
        this.announcements[0].isNew = false
      }
      else {
        this.toast.error_bot_center(res, 3)
      }
    }, err => {
      console.log(err)
    })
  }

  test(a) {
    console.log(a)
  }

  delete(a: IAnnouncement) {
    this.svc.deleteAnnouncement(a).subscribe(res => {
      if (res.OK == true) {
        this.toast.success_bot_center(res.message, 3)
        this.announcements = this.announcements.filter(q => q != a)
      }
      else {
        this.toast.error_bot_center(res, 3)
      }
    }, err => {
      this.toast.error_bot_center(err.error.message, 3)
    })
  }

  update(a: IAnnouncement) {
    this.svc.updateAnnouncement(a).subscribe(res => {
      if (res.OK == true) {
        this.toast.success_bot_center(res.message, 3)
      }
      else {
        this.toast.error_bot_center(res, 3)
      }
    }, err => {
      this.toast.error_bot_center(err.error.message, 3)
    })
  }

}
