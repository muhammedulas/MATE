import { Component, OnInit } from '@angular/core';
import { company } from 'src/app/models/company';
import { AdminService } from 'src/app/services/admin.service';
import { GeneralService } from 'src/app/services/general.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  public companyInfo = new company();

  constructor(private svc: AdminService, private toast: ToastService) {
    this.svc.getCompanyInfo().subscribe(inf => {
      this.companyInfo = inf
    })
  }

  ngOnInit() {
  }

  update() {
    this.svc.updateCompanyInfo(this.companyInfo).subscribe(res => {
      this.toast.success_bot_center(res, 3)
    }, err => {
      console.log(err)
    })
  }

}
