import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dialog_confirmationComponent } from 'src/app/components/commonDialogs/dialog_confirmation/dialog_confirmation.component';
import { contactInfo } from 'src/app/models/contactInfo';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-dialog_contact',
  templateUrl: './dialog_contact.component.html',
  styleUrls: ['./dialog_contact.component.scss']
})
export class Dialog_contactComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<Dialog_confirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: user,
  ) { }

  ngOnInit() {
  }

}
