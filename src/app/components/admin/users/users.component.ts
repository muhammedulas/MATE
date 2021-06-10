import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Iconfirmation } from 'src/app/app.component';
import { contactInfo } from 'src/app/models/contactInfo';
import { user } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';
import { GlobalService } from 'src/app/services/global.service';
import { ToastService } from 'src/app/services/toast.service';
import { Dialog_confirmationComponent } from '../../commonDialogs/dialog_confirmation/dialog_confirmation.component';
import { Dialog_newUserComponent } from './dialog_newUser/dialog_newUser.component';
import { Dialog_passwordComponent } from './dialog_password/dialog_password.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public searchString: string = '';
  public users: user[] = [];
  public selected: number = 0;
  public temp: user = new user();
  public showModal: boolean = false;
  deleteDialogRef: MatDialogRef<any>;
  newUserDialogRef: MatDialogRef<any>;
  passDialogRef: MatDialogRef<any>;

  constructor(private svc: AdminService, private toast: ToastService, private dialog: MatDialog, private global: GlobalService) { }

  ngOnInit() {
    this.getUsers()
  }

  getUsers() {
    this.svc.getUsers().subscribe(list => {
      this.users = list
      this.users.forEach(u => {
        if (!u.CONTACT_INFO) {
          u.CONTACT_INFO = new contactInfo();
        }
      })
    })
  }

  select(record: user) {
    if (this.selected != record.USERID) {
      this.selected = record.USERID
      this.temp = new user();
      console.log(JSON.stringify(record))
      this.temp = {
        USERID: record.USERID,
        USERNAME: record.USERNAME,
        PW_KEY: record.PW_KEY,
        NAME: record.NAME,
        SURNAME: record.SURNAME,
        IS_ADMIN: record.IS_ADMIN,
        STATUS: record.STATUS,
        CONTACT_INFO: record.CONTACT_INFO
      }
    }
  }

  update(u) {
    this.svc.updateUser(u).subscribe(res => {
      if (res.OK == true) {
        console.log(res)
        this.toast.success_bot_center(res.message, 3)
      }
      else {
        this.toast.error_bot_center(res.message, 3)
      }
    })
  }

  deleteUser(user: user) {
    let dialogData: Iconfirmation = {
      title: 'Silme İşlemini Onayla',
      themeColor: 'warn',
      description: user.USERNAME + ' kullanıcısı silinecektir. Onaylıyor musunuz?',
      action: 'delete',
      id: user.USERID,
      actionButtonColor: 'warn'
    }
    this.deleteDialogRef = this.dialog.open(Dialog_confirmationComponent, {
      data: dialogData
    })
  }

  addUser() {
    this.dialog.open(Dialog_newUserComponent)
  }

  setPassword(id) {
    this.passDialogRef = this.dialog.open(Dialog_passwordComponent, {
      data: id
    })
  }

}
