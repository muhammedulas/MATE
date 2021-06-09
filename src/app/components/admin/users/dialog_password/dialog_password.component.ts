import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneralService } from 'src/app/services/general.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-dialog_password',
  templateUrl: './dialog_password.component.html',
  styleUrls: ['./dialog_password.component.scss']
})
export class Dialog_passwordComponent implements OnInit {
  public password = '';
  constructor(public dialogRef: MatDialogRef<Dialog_passwordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private svc: GeneralService,
    private toast: ToastService
  ) { }

  ngOnInit() {
  }

  setPw() {
    this.svc.setPassword(this.password, this.data).subscribe(res => {
      if (res.OK == true) {
        this.toast.success_bot_center(res.message, 3)
      }
      else {
        this.toast.error_bot_center(res, 3)
      }
    })
  }

}
