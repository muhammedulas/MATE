import { Component, OnInit } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatTable } from '@angular/material/table';
import { MatCard } from '@angular/material/card';
import { team } from 'src/app/models/team';
import { GeneralService } from 'src/app/services/general.service';
import { contactInfo } from 'src/app/models/contactInfo';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Dialog_contactComponent } from '../admin/announcements/dialog_contact/dialog_contact.component';
import { ITask } from 'src/app/app.component';
import { Dialog_taskComponent } from '../commonDialogs/dialog_task/dialog_task.component';
import { teamMember } from 'src/app/models/teamMember';
import { AuthService } from 'src/app/services/auth.service';
import { tokenResponse } from 'src/app/models/tokenResponse';

@Component({
  selector: 'app-_teams',
  templateUrl: './_teams.component.html',
  styleUrls: ['./_teams.component.scss']
})
export class _teamsComponent implements OnInit {
  private session:tokenResponse = new tokenResponse();
  public date = new Date();
  public amIManager: boolean = false;
  public contactInfo: contactInfo;
  public teams: team[] = [];
  public displayedColumns = ['pointer', 'username', 'name', 'surname', 'role', 'actions']
  constructor(
    private svc: GeneralService,
    private dialog: MatDialog,
    private auth: AuthService
  ) { 
    this.session = JSON.parse(localStorage.getItem('session'))
  }

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

  addTask(member: teamMember) {
    let data: ITask = {
      fromTeamsSection: true,
      newTask: true,
      inspectMode: false,
      TASKID: 0,
      TEAM_TASK: false,
      ASSIGNED_TEAM: undefined,
      ASSIGNED_USER: member.USERID,
      CREATED_BY: this.session.userName,
      CREATED_AT: this.date,
      DEADLINE: this.date,
      MODIFIED_BY: undefined,
      MODIFIED_AT: undefined,
      TASK_TITLE: "",
      TASK_DESCRIPTION: "",
      STATUS: 0,
      STATUS_COMMENT: "",
      RESULT: undefined,
      CLOSED_AT: undefined
    }
    let ref: MatDialogRef<Dialog_taskComponent> = this.dialog.open(Dialog_taskComponent, {
      width: "70vw",
      height: "81vh",
      data: data
    })
  }
}
