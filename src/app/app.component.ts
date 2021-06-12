import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { GlobalService } from './services/global.service';

export interface Iconfirmation {
  title: string;
  description: string;
  actionButtonColor?: string;
  themeColor?: string;
  action: string;
  additional?: string;
  id?: number;
  index?: number;
}

export interface ITask {
  fromTeamsSection?:boolean;
  newTask?: boolean;
  inspectMode?: boolean
  TASKID?: number;
  TEAM_TASK?: boolean;
  ASSIGNED_TEAM?: number;
  ASSIGNED_TEAM_NAME?: string;
  ASSIGNED_USER?: number;
  ASSIGNED_USER_USERNAME?: string;
  CREATED_BY?: string;
  CREATED_AT?: Date;
  DEADLINE?: Date;
  MODIFIED_BY?: string;
  MODIFIED_AT?: Date;
  TASK_TITLE?: string;
  TASK_DESCRIPTION?: string;
  STATUS?: number;
  STATUS_COMMENT?: string;
  RESULT?: number;
  CLOSED_AT?: Date
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MATE';
  constructor(private global: GlobalService, private auth: AuthService) {
    this.global.sideNavActive.next(true);
    this.auth.sessionInfo.next(JSON.parse(localStorage.getItem('session')))
  }

  checkLoggedInState() {
    return this.auth.isLoggedIn
  }
}
