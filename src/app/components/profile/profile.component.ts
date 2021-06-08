import { Component, OnInit } from '@angular/core';
import { contactInfo } from 'src/app/models/contactInfo';
import { user } from 'src/app/models/user';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public userInfo = new user();
  constructor(
    private svc:GeneralService
  ) {
    this.userInfo.CONTACT_INFO = new contactInfo();
   }

  ngOnInit() {
    this.svc.getOwnInfo().subscribe(res=>{
      this.userInfo = res
      console.log(res)
    })
  }

}
