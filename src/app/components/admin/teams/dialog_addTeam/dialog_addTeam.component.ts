import { Component, OnInit } from '@angular/core';
import { department } from 'src/app/models/department';
import { team } from 'src/app/models/team';
import { AdminService } from 'src/app/services/admin.service';
import { ToastService } from 'src/app/services/toast.service';
import { TeamsComponent } from '../teams.component';

@Component({
  selector: 'app-dialog_addTeam',
  templateUrl: './dialog_addTeam.component.html',
  styleUrls: ['./dialog_addTeam.component.scss']
})
export class Dialog_addTeamComponent implements OnInit {
  public team: team = new team();
  public departments: department[] = [];
  public selectedDep: department = new department();
  constructor(
    private svc: AdminService,
    private parent: TeamsComponent,
    private toast: ToastService
  ) {
    this.svc.getDepartments().subscribe(res => {
      this.departments = res
    })
  }

  ngOnInit() {
  }

  select(dep) {
    this.selectedDep = dep
  }

  create() {
    this.team.DEPREF = this.selectedDep.DEPID
    this.team.DEP_NAME = this.selectedDep.DEPARTMENT_NAME
    this.svc.createTeam(this.team).subscribe(res => {
      this.parent.teams.push(this.team)
      this.parent.getTeams();
      this.toast.success_bot_center(res, 3)
    }, err => {
      this.toast.error_bot_center(err.error, 3)
    })
  }

}
