import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatList } from '@angular/material/list';
import { MatButton } from '@angular/material/button';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { MatTooltip } from '@angular/material/tooltip';
import { GlobalService } from 'src/app/services/global.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public sideNavActive = true;
  public showAdminNav: boolean;

  constructor(private global:GlobalService, private auth:AuthService) {
    this.showAdminNav = this.auth.isAdmin
   }

  ngOnInit() {
  }

  checkRole(){
    return this.auth.isAdmin
  }


}
