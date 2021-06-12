import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Iconfirmation } from 'src/app/app.component';
import { AdminService } from 'src/app/services/admin.service';
import { GlobalService } from 'src/app/services/global.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-dialog_confirmation',
  templateUrl: './dialog_confirmation.component.html',
  styleUrls: ['./dialog_confirmation.component.scss']
})
export class Dialog_confirmationComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<Dialog_confirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Iconfirmation,
    private svc: AdminService,
    private toast: ToastService,
    private global: GlobalService
  ) { }
  ngOnInit() {
  }

  action() {
    if (this.data.action === 'deleteUser') {
      this.svc.deleteUser(this.data.id).subscribe(res => {
        this.global.reRouteAdmin()
        this.toast.success_bot_center(res, 3)
      }, err => {
        this.toast.error_bot_center(err.error.Message, 3)
      })
    }

    if (this.data.action === 'deleteTeam') {
      this.svc.deleteTeam(this.data.id).subscribe(res => {
        this.global.reRouteAdmin()
        this.toast.success_bot_center(res.message, 3)
      }, err => {
        this.toast.error_bot_center(err, 3)
      })
    }

    if (this.data.action === 'deleteDepartment') {
      this.svc.deleteDepartment(this.data.id).subscribe(res => {
        this.global.reRouteAdmin()
        this.toast.success_bot_center(res.message, 3)
      }, err => {
        console.log(err)
        this.toast.error_bot_center(err.error.Message, 3, 'Ekip Silinemedi')
      })
    }

    if (this.data.action === 'deleteTask') {
      this.svc.deleteTask(this.data.id).subscribe(res => {
        this.toast.success_bot_center(res.message, 3)
      }, err => {
        this.toast.error_bot_center(err, 3)
      })
    }

  }

}
