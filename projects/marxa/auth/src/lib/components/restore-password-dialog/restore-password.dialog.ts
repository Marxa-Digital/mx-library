import { Component,  Inject,  Input,  OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MxAuth } from '../../auth.service';
import { MxRestorePasswordLabels } from '../../models/labels.model';

@Component({
  templateUrl: './restore-password.dialog.html',
  styleUrls: ['./restore-password.dialog.scss']
})
export class RestorePasswordDialog implements OnInit {

  emailAccount: string = ''


  constructor(
    @Inject(MAT_DIALOG_DATA) public labels: MxRestorePasswordLabels,
    public dialog: MatDialogRef<RestorePasswordDialog>,
    public loginS: MxAuth
  ) { }

  ngOnInit(): void {
  }

}


