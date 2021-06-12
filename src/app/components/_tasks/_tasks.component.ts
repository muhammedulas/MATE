import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Iconfirmation, ITask } from 'src/app/app.component';
import { task } from 'src/app/models/task';
import { tokenResponse } from 'src/app/models/tokenResponse';
import { TaskOwnerPipe } from 'src/app/pipes/taskOwner.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import { GlobalService } from 'src/app/services/global.service';
import { ToastService } from 'src/app/services/toast.service';
import { Dialog_confirmationComponent } from '../commonDialogs/dialog_confirmation/dialog_confirmation.component';
import { Dialog_statusCommentComponent } from '../commonDialogs/dialog_statusComment/dialog_statusComment.component';
import { Dialog_taskComponent } from '../commonDialogs/dialog_task/dialog_task.component';

@Component({
  selector: 'app-_tasks',
  templateUrl: './_tasks.component.html',
  styleUrls: ['./_tasks.component.scss']
})
export class _tasksComponent implements OnInit {
  private session: tokenResponse = new tokenResponse();
  public shownTasks = 0;
  private selectedTask: task = new task();
  public myTasks: task[] = [];
  public tasksCreatedByMe: task[] = [];
  public displayedColumns = ["assignedTo", "createdBy", "title", "description", "status", "statusIcon"];
  constructor(
    private svc: GeneralService,
    private pipe: TaskOwnerPipe,
    private global: GlobalService,
    private toast: ToastService,
    private dialog: MatDialog
  ) {
    this.getTasks()
    this.session = JSON.parse(localStorage.getItem('session'))
  }

  ngOnInit() {
    this.getTasks()
  }

  getTasks() {
    this.svc.getMyTasks().subscribe(res => {
      this.myTasks = res.filter(q => {
        return q.ASSIGNED_USER == parseInt(this.session.userId)

      })
      this.tasksCreatedByMe = res.filter(q => {
        return q.CREATED_BY == this.session.userName
      })
      for (let i = 0; i < this.myTasks.length - 1; i++) {
        if (this.myTasks[i].TASKID == this.myTasks[i + 1].TASKID) {
          this.myTasks = this.myTasks.slice(i, 1)
        }
      }
    })
  }

  select(t) {
    if (this.selectedTask == t) {
      this.selectedTask = new task();
    }
    else {
      this.selectedTask = t;
    }
    console.log(this.selectedTask)
  }

  addStatusComment() {
    if (!this.selectedTask.TASKID) {
      this.toast.warning_bot_center('İncelemek İstediğiniz Kaydı Seçin.', 3)
      return
    }
    let ref = this.dialog.open(Dialog_statusCommentComponent, {
      data: this.selectedTask,
      width: "40vw"
    })
  }

  inspect() {
    if (!this.selectedTask.TASKID) {
      this.toast.warning_bot_center('İncelemek İstediğiniz Kaydı Seçin.', 3)
      return
    }
    let data: ITask = {
      newTask: false,
      inspectMode: true,
      TASKID: this.selectedTask.TASKID,
      TEAM_TASK: this.selectedTask.TEAM_TASK,
      ASSIGNED_TEAM: this.selectedTask.ASSIGNED_TEAM,
      ASSIGNED_TEAM_NAME: this.selectedTask.ASSIGNED_TEAM_NAME,
      ASSIGNED_USER_USERNAME: this.selectedTask.ASSIGNED_USER_USERNAME,
      ASSIGNED_USER: this.selectedTask.ASSIGNED_USER,
      CREATED_BY: this.selectedTask.CREATED_BY,
      CREATED_AT: new Date(this.selectedTask.CREATED_AT),
      DEADLINE: new Date(this.selectedTask.DEADLINE),
      MODIFIED_BY: this.selectedTask.MODIFIED_BY,
      MODIFIED_AT: new Date(this.selectedTask.MODIFIED_AT),
      TASK_TITLE: this.selectedTask.TASK_TITLE,
      TASK_DESCRIPTION: this.selectedTask.TASK_DESCRIPTION,
      STATUS: this.selectedTask.STATUS,
      STATUS_COMMENT: this.selectedTask.STATUS_COMMENT,
      RESULT: this.selectedTask.RESULT,
      CLOSED_AT: new Date(this.selectedTask.CLOSED_AT)
    }
    let ref: MatDialogRef<Dialog_taskComponent> = this.dialog.open(Dialog_taskComponent, {
      width: "70vw",
      height: "81vh",
      data: data
    })
  }

  changeTaskStatus(status: number, result?: number) {
    if (!this.selectedTask.TASKID) {
      this.toast.warning_bot_center('Güncellenecek Kaydı Seçin.', 3)
      return
    }

    if (this.selectedTask.TASKID == undefined) {
      this.toast.warning_bot_center("Önce Kayıt Seçin", 3)
      return
    }
    let temp = this.selectedTask
    temp.STATUS = status;
    if (result) {
      temp.RESULT = result
      if (this.selectedTask.STATUS != 2) {
        temp.CLOSED_AT = this.global.getLocalTime()
      }
    }
    else {
      temp.CLOSED_AT = null
    }
    let ref = this.svc.updateTask(temp).subscribe(res => {
      if (res.OK == true) {
        this.getTasks()
        ref.unsubscribe()
      }
      else {
        console.log(res)
      }
    }, err => {
      console.log(err)
    })
  }

  delete() {
    if (!this.selectedTask.TASKID) {
      this.toast.warning_bot_center('Silinecek Kaydı Seçin', 3)
      return
    }
    let data: Iconfirmation = {
      title: "Silme İşlemini Onayla",
      description: "Seçilen görev silinecektir. Onaylıyor musunuz?",
      actionButtonColor: "warn",
      themeColor: "warn",
      action: "deleteTask",
      id: this.selectedTask.TASKID
    }
    let ref = this.dialog.open(Dialog_confirmationComponent, {
      data: data
    }).afterClosed().subscribe(r => {
      this.getTasks()
      ref.unsubscribe()
    })
  }


}

function identifyTask(t: task[]) {
  return t.filter(r => {
    r.MODIFIED_AT != null
  })
}

const unique = (value, index, self) => {
  return self.indexOf(value) === index
}