import { Component, OnInit } from '@angular/core';
import { contactInfo } from 'src/app/models/contactInfo';
import { user } from 'src/app/models/user';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AdminService } from 'src/app/services/admin.service';
import { GlobalService } from 'src/app/services/global.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-dialog_newUser',
  templateUrl: './dialog_newUser.component.html',
  styleUrls: ['./dialog_newUser.component.scss']
})
export class Dialog_newUserComponent implements OnInit {
  public newUser = {
    "USERID": 0,
    "USERNAME": "",
    "PW_KEY": "",
    "NAME": "",
    "SURNAME": "",
    "IS_ADMIN": undefined,
    "STATUS": 1,
    "CONTACT_INFO": new contactInfo()
  }
  constructor(
    private svc: AdminService,
    private global: GlobalService,
    private toast: ToastService
  ) { }

  ngOnInit() {
  }

  create() {
    this.svc.createUser(this.newUser).subscribe(res => {
      if (res.OK == true) {
        this.toast.success_bot_center(res.message, 3)
        this.global.reRouteAdmin();
      }
      else {
        this.toast.error_bot_center(res, 3)
      }
    })
  }

}
