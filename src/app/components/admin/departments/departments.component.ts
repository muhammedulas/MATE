import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Iconfirmation } from 'src/app/app.component';
import { department } from 'src/app/models/department';
import { AdminService } from 'src/app/services/admin.service';
import { GlobalService } from 'src/app/services/global.service';
import { ToastService } from 'src/app/services/toast.service';
import { Dialog_confirmationComponent } from '../../commonDialogs/dialog_confirmation/dialog_confirmation.component';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {
  public createMode: boolean = false;
  public departments: department[] = []
  public displayedColumns = ["teamName", "teamDef", "memberCount"]
  public deleteDialogRef: MatDialogRef<any>;
  public newDepartment: department;

  constructor(
    private svc: AdminService,
    private dialog: MatDialog,
    private global: GlobalService,
    private toast: ToastService
  ) { }

  ngOnInit() {
    this.getDepartments();
    this.setNewDepartment();
  }

  getDepartments() {
    this.svc.getDepartments().subscribe(res => {
      this.departments = res
    }, err => {
      console.log(err)
    })
  }

  createDepartment() {
    this.svc.createDepartment(this.newDepartment).subscribe(res=>{
      console.log(res)
        this.global.reRouteAdmin();
        this.toast.success_bot_center(res, 3);
        this.createMode = false;
        this.setNewDepartment();
    })
  }

  updateDepartment(dep) {
    this.svc.updateDepartment(dep).subscribe(res => {
      if (res.OK == true) {
        this.toast.success_bot_center(res.message, 3)
      }
    }, err => {
      this.toast.error_bot_center(err, 3)
    })
  }

  deleteDepartment(dep: department) {
    let dialogData: Iconfirmation = {
      title: 'Silme İşlemini Onayla',
      description: dep.DEPARTMENT_NAME + ' Departmanı silinecektir. Onaylıyor musunuz?',
      actionButtonColor: 'warn',
      action: 'deleteDepartment',
      id: dep.DEPID
    }
    this.deleteDialogRef = this.dialog.open(Dialog_confirmationComponent, {
      data: dialogData
    })
  }

  setNewDepartment() {
    this.newDepartment = {
      DEPID: -1,
      DEPARTMENT_DEF: "",
      DEPARTMENT_NAME: "",
      COMPREF: 1
    }
  }

  cancel() {
    this.setNewDepartment();
    this.createMode = false;
  }
}
