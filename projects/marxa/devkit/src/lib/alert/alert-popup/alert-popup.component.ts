import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MxAlertModel } from '../alerts.model';

@Component({
  templateUrl: './alert-popup.component.html',
  styleUrls: ['./alert-popup.component.scss'],
})
export class AlertPopupComponent implements OnInit {

  constructor (
    public dialog: MatDialogRef<AlertPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MxAlertModel
  ) {
   }

  ngOnInit(): void {
  }

}
