import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { team } from 'src/app/models/team';
import { teamMember } from 'src/app/models/teamMember';
import { user } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';
import { GlobalService } from 'src/app/services/global.service';
import { ToastService } from 'src/app/services/toast.service';
import { AdminComponent } from '../admin.component';
import { Dialog_addMemberComponent } from './dialog_addMember/dialog_addMember.component';
import { Dialog_addTeamComponent } from './dialog_addTeam/dialog_addTeam.component';

export interface idIndex {
  id: number;
  index: number
}
@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion
  public teams: team[] = []
  public displayedColumns = ["username", "name", "surname", "role"];
  public selectedMember: teamMember = new teamMember();
  public memberIndex: number;
  public memberDialogRef:MatDialogRef<Dialog_addMemberComponent>;
  public teamDialogRef;

  constructor(
    private svc: AdminService,
    private toast: ToastService,
    private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router,
    private global:GlobalService

  ) { }

  ngOnInit() {
    this.getTeams();
  }

  reRoute() {
    this.global.reRouteAdmin();
  }

  select(m: teamMember) {
    this.selectedMember = m;
  }

  getTeams() {
    this.svc.getTeams().subscribe(res => {
      this.teams = res;
    })
  }

  removeMember(teamId: number, i: number) {
    this.svc.removeUser(teamId, this.selectedMember.USERID).subscribe(res => {
      if (res.OK == true) {
        this.toast.success_bot_center(res.message, 3)
        this.teams[i].MEMBER_COUNT--
        this.teams[i].MEMBERS = this.teams[i].MEMBERS.filter(q => {
          return q != this.selectedMember
        })
      }
      else {
        this.toast.error_bot_center(res, 3)
      }
    })
  }

  addTeam() {
    this.teamDialogRef = this.dialog.open(Dialog_addTeamComponent, {
    })
  }

  deleteTeam(team: team, i) {
    this.svc.deleteTeam(team.TEAMID).subscribe(res => {
      if (res.OK == true) {
        this.teams = this.teams.filter(q => {
          return q != team
        })
      }
    })
  }

  updateTeam(team: team) {
    this.svc.updateTeam(team).subscribe(res => {
      if (res.OK == true) {
        this.toast.success_bot_center(res.message, 3)
      }
      else {
        this.toast.error_bot_center(res, 3)
      }
    })
  }

  addMember(i: number) {
    let tInfo: idIndex = {
      id: this.teams[i].TEAMID,
      index: i
    }
    this.memberDialogRef = this.dialog.open(Dialog_addMemberComponent, {
      width: '50vw',
      data: tInfo
    });
    this.memberDialogRef.afterClosed().subscribe(d=>{
      this.getTeams();
    })
  }

  trackChanges(index: number, team) {
    return team.TEAMID
  }

}
