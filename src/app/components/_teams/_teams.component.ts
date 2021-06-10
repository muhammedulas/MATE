import { Component, OnInit } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatTable } from '@angular/material/table';
import { MatCard } from '@angular/material/card';
import { team } from 'src/app/models/team';
import { GeneralService } from 'src/app/services/general.service';
import { contactInfo } from 'src/app/models/contactInfo';
import { MatDialog } from '@angular/material/dialog';
import { Dialog_contactComponent } from '../admin/announcements/dialog_contact/dialog_contact.component';

@Component({
  selector: 'app-_teams',
  templateUrl: './_teams.component.html',
  styleUrls: ['./_teams.component.scss']
})
export class _teamsComponent implements OnInit {
  public amIManager: boolean = false;
  public contactInfo: contactInfo;
  public teams: team[] = [];
  public displayedColumns = ['pointer', 'username', 'name', 'surname', 'role', 'actions']
  constructor(
    private svc: GeneralService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getTeams();
  }

  getTeams() {
    this.svc.getMyTeams().subscribe(res => {
      this.teams = res
    }, err => {
      console.log(err)
    })
  }

  getContactInfo(id) {
    let subscription = this.svc.getUserContactInfo(id).subscribe(res => {
      this.dialog.open(Dialog_contactComponent, {
        data: res
      })
      subscription.unsubscribe()
    })
  }

  checkRole(teamIndex) {
    this.amIManager = false
    this.teams[teamIndex].MEMBERS.forEach(m => {
      if (m.USERID == parseInt(this.svc.session.userId) && m.Role == 1) {
        this.amIManager = true
      }
    })

  }



}
