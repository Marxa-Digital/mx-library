import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MxAuth } from '../../auth.service';

@Component({
  selector: 'mx-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent implements OnInit {

  @Input() public signOutLabel: string = 'Cerrar sesión'
  @Input() public signInLabel: string = 'Iniciar sesión'
  @Input() public adverticeLabel: string = 'IMPORTANTE'
  @Input() public googleAccountAdverticeLabel: string = '<p>Debes tener una cuenta de Google <i>(tunombredeusuario@<b>gmail.com</b>)</i> para iniciar sesión.</p>'
  @Input() public adverticeConfirmBtn: string = 'Entiendo'

  @Input() accountAdvertice: boolean = true
  @Input() method: 'google' | 'facebook' = 'google'
  @Output() isLogged: EventEmitter<any> = new EventEmitter()
  constructor(
    public dialog: MatDialog,
    public _login: MxAuth,
  ) { }

  ngOnInit() {
    this._login.user$.pipe().subscribe( user => {
      if ( user ) { this.isLogged.emit( user ) }

    })
  }

  openDialog(): void {
    if (this.accountAdvertice) {
      const dialogRef = this.dialog.open(LoginButtonDialog, {
        width: '350px',
        data: {
          adverticeLabel: this.adverticeLabel,
          googleAccountAdverticeLabel: this.googleAccountAdverticeLabel,
          adverticeConfirmBtn: this.adverticeConfirmBtn
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.loginMethod()
      });
    } else {
      this.loginMethod()
    }
  }

  loginMethod() {
    if (this.method == 'google') {
      this._login.googleSingIn().then(user => {
        this.isLogged.emit(user)
      })
    } else {
      this._login.facebookSingIn().then(user => {
        this.isLogged.emit(user)
      })
    }
  }


}

@Component({
  selector: 'aSmart-login-button-dialog',
  templateUrl: './login-button-dialog.html'
})
export class LoginButtonDialog {

  constructor(
    public dialogRef: MatDialogRef<LoginButtonDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
   ) {}

  onClick(): void {
    this.dialogRef.close();
  }

}
