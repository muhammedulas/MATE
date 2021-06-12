import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { ITask } from 'src/app/app.component';
import { team } from 'src/app/models/team';
import { user } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';
import { GlobalService } from 'src/app/services/global.service';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-dialog_task',
  templateUrl: './dialog_task.component.html',
  styleUrls: ['./dialog_task.component.scss']
})
export class Dialog_taskComponent implements OnInit {
  public date = new Date();
  public users: user[] = [];
  public teams: team[] = [];

  constructor(
    public dialogRef: MatDialogRef<Dialog_taskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITask,
    private svc: AdminService,
    private toast: ToastService,
    private global: GlobalService
  ) { }
  @ViewChild('status') statusRef: MatSelect
  @ViewChild('result') resultRef: MatSelect
  ngOnInit() {
    this.getOptions();
  }

  getOptions() {
    let usrRef = this.svc.getUsers().subscribe(res => {
      this.users = res
      usrRef.unsubscribe()
    })
    let teamRef = this.svc.getTeams().subscribe(res => {
      this.teams = res
      teamRef.unsubscribe()
    })

  }


  setScope(b: boolean) {
    console.log(this.data)
  }

  onStatusChange() {
    console.log('test')
    if (this.data.STATUS != 2) {
      this.resultRef.options.forEach(opt => {
        opt.deselect()
      })
    }
  }

  create() {
    this.svc.createTask(this.data).subscribe(res => {
      if (res.OK == true) {
        this.toast.success_bot_center('Görev Oluşturuldu', 3)
      }
      else {
        this.toast.error_bot_center(res, 3)
      }
    }, err => {
      this.toast.error_bot_center(err.error.Message + '//Detaylar için konsolu kontrol edin.', 3, 'Beklenmeyen Bir Hata Oluştu')
      console.log(err)
    })
  }

}
