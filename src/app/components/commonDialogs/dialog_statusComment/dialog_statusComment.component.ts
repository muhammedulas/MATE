import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { task } from 'src/app/models/task';
import { GeneralService } from 'src/app/services/general.service';
import { Dialog_confirmationComponent } from '../dialog_confirmation/dialog_confirmation.component';

@Component({
  selector: 'app-dialog_statusComment',
  templateUrl: './dialog_statusComment.component.html',
  styleUrls: ['./dialog_statusComment.component.scss']
})
export class Dialog_statusCommentComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<Dialog_confirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: task,
    private svc: GeneralService
  ) { }

  ngOnInit() {
  }

  action(){
    this.svc.updateTask(this.data).subscribe(res=>{
      console.log(res)
    })
  }

}
