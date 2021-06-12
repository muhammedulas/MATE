import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Iconfirmation, ITask } from 'src/app/app.component';
import { task } from 'src/app/models/task';
import { AdminService } from 'src/app/services/admin.service';
import { GlobalService } from 'src/app/services/global.service';
import { ToastService } from 'src/app/services/toast.service';
import { Dialog_confirmationComponent } from '../../commonDialogs/dialog_confirmation/dialog_confirmation.component';
import { Dialog_taskComponent } from '../../commonDialogs/dialog_task/dialog_task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  public date = new Date();
  public selectedTask = new task();
  public tasks: task[] = [];
  public displayedColumns = ["scope", "assignedTo", "createdBy", "title", "description", "status", "statusIcon"];

  constructor(
    private svc: AdminService,
    private toast: ToastService,
    private dialog: MatDialog,
    private global: GlobalService
  ) { }
  ngOnInit() {
    this.getTasks();
  }


  getTasks() {
    let ref = this.svc.getAlTasks().subscribe(res => {
      this.tasks = res
      ref.unsubscribe()
    })
  }

  select(t) {
    if (this.selectedTask == t) {
      this.selectedTask = new task();
    }
    else {
      this.selectedTask = t;
    }
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

      }
    }, err => {
      console.log(err)
    })
  }

  addTask() {
    let data: ITask = {
      newTask: true,
      inspectMode: false,
      TASKID: 0,
      TEAM_TASK: false,
      ASSIGNED_TEAM: undefined,
      ASSIGNED_USER: undefined,
      CREATED_BY: undefined,
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
    ref.afterClosed().subscribe(r => {
      this.getTasks()
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

  update() {
    if (!this.selectedTask.TASKID) {
      this.toast.warning_bot_center('Güncellenecek Kaydı Seçin.', 3)
      return
    }
    else {
      let data: ITask = {
        newTask: false,
        inspectMode: false,
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


