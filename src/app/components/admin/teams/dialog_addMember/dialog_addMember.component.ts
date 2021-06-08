import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { teamMember } from 'src/app/models/teamMember';
import { user } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';
import { ToastService } from 'src/app/services/toast.service';
import { TeamsComponent } from '../teams.component';

@Component({
  selector: 'app-dialog_addMember',
  templateUrl: './dialog_addMember.component.html',
  styleUrls: ['./dialog_addMember.component.scss']
})
export class Dialog_addMemberComponent implements OnInit {
  public users: user[] = [];
  public selectedUser: user = new user();
  public members: teamMember[] = [];
  public role: number = 1;
  public displayedColumns = ["username", "name", "surname"]
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private svc: AdminService,
    private parent: TeamsComponent,
    private toast: ToastService
  ) { }

  ngOnInit() {
    this.getUserList()
  }
  getUserList() {
    this.svc.getUsers().subscribe(res => {
      this.users = res
    })
  }

  addUser() {
    console.log(this.data)
    let teamId = this.parent.teams[this.data].TEAMID
    let userId = this.selectedUser.USERID
    this.svc.addMember(teamId, userId, this.role).subscribe(res => {
      if (res.OK == true) {
        let usr: teamMember = {
          USERID: this.selectedUser.USERID,
          USERNAME: this.selectedUser.USERNAME,
          Role: this.role,
          NAME: this.selectedUser.NAME,
          SURNAME: this.selectedUser.SURNAME
        }
        this.parent.teams[this.data].MEMBERS.splice(this.parent.teams[this.data].MEMBERS.length, 0, usr)
        this.toast.success_bot_center(res.message, 3)
      }
    }, err => {
      this.toast.error_bot_center(err.error.Message, 3)
    })
  }

  select(usr: user) {
    this.selectedUser = usr
  }

}
