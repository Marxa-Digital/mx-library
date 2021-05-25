import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './error-columns-required.component.html',
  styleUrls: ['./error-columns-required.component.scss']
})
export class ErrorColumnsRequiredComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public message: string,
    public dialog: MatDialogRef<ErrorColumnsRequiredComponent>
  ) { }

  ngOnInit(): void {
  }

}
