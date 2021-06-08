import { Component, OnInit } from '@angular/core';
import { contactInfo } from 'src/app/models/contactInfo';
import { user } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: user[] = [];
  public selected: number = 0;
  public temp: user = new user();

  constructor(private svc: AdminService, private toast: ToastService) { }

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
        this.toast.success_bot_center(res.message, 3)
      }
      else {
        this.toast.error_bot_center(res.message, 3)
      }
    })
  }

}
