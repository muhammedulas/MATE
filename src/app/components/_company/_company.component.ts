import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { company } from 'src/app/models/company';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-_company',
  templateUrl: './_company.component.html',
  styleUrls: ['./_company.component.scss']
})
export class _companyComponent implements OnInit {
  public companyInfo: company = new company();
  public subscription: Subscription;
  constructor(
    private svc: GeneralService
  ) { }

  ngOnInit() {
    this.subscription = this.getCompanyInfo().subscribe(res => {
      this.companyInfo = res
      this.subscription.unsubscribe();
    })
  }

  getCompanyInfo() {
    return this.svc.getCompanyInfo()
  }

}
