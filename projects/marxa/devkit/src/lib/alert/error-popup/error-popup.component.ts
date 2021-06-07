import { Component, Inject, OnInit } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MxErrorAlertModel } from '../alerts.model';

@Component({
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.scss']
})
export class ErrorPopupComponent implements OnInit {

  constructor (
    @Inject(MAT_DIALOG_DATA) public data: MxErrorAlertModel,
    public dialog: MatDialogRef<ErrorPopupComponent>
  ) { }

  ngOnInit(): void {
  }

}
