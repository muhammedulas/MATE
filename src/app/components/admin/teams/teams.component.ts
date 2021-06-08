import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { team } from 'src/app/models/team';
import { teamMember } from 'src/app/models/teamMember';
import { user } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';
import { ToastService } from 'src/app/services/toast.service';
import { Dialog_addMemberComponent } from './dialog_addMember/dialog_addMember.component';
import { Dialog_addTeamComponent } from './dialog_addTeam/dialog_addTeam.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  @ViewChild(MatTable) memberTable: MatTable<any>
  public teams: team[] = []
  public displayedColumns = ["username", "name", "surname", "role"];
  public selectedMember: teamMember = new teamMember();
  public memberIndex: number;
  public memberDialogRef;
  public teamDialogRef;

  constructor(
    private svc: AdminService,
    private toast: ToastService,
    private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,

  ) {
    this.getTeams();

  }


  ngOnInit() {
  }

  reRender() {
    this.memberTable.renderRows()
  }

  select(m: teamMember) {
    this.selectedMember = m;
  }

  getTeams() {
    this.svc.getTeams().subscribe(res => {
      this.teams = res;
      console.log(this.teams)
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

  addTeam(){
    this.teamDialogRef = this.dialog.open(Dialog_addTeamComponent, {

    })
  }

  deleteTeam(team:team, i){
    this.svc.deleteTeam(team.TEAMID).subscribe(res=>{
      if(res.OK == true){
        this.teams = this.teams.filter(q=>{
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
    this.memberDialogRef = this.dialog.open(Dialog_addMemberComponent, {
      width: '50vw',
      data: i
    })
  }

  trackChanges(index:number, team){
    return team.TEAMID
  }

}
