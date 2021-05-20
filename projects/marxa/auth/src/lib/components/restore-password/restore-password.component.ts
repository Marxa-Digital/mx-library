import { Location } from '@angular/common';
import { Component,  EventEmitter,  Input,  OnInit, Output } from '@angular/core';
import { MxAuth } from '../../auth.service';

@Component({
  selector: 'mx-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit {

  emailAccount: string = ''
  @Input() public autoSend: boolean = true

  @Input() public titleLabel: string = 'Restaurar contraseña'
  @Input() public emailLabel: string = 'Email'
  @Input() public exampleLabel: string = 'ejemplo@gmail.com'
  @Input() public requiredLabel: string = 'Este campo es requerido'
  @Input() public cancelButtonLabel: string = 'Cancelar'
  @Input() public cancelButtonColor: 'primary' | 'accent' | 'warn' = 'primary'
  @Input() public sendButtonColor: 'primary' | 'accent' | 'warn' = 'primary'
  @Input() public sendButtonLabel: string = 'Enviar'
  @Input() public confirmationMessage: string = ''

  @Output() public onSubmit = new EventEmitter<void>()
  constructor (
    public login_: MxAuth,
    public location_: Location
  ) { }

  ngOnInit(): void {
  }

  onSubmitClick() {
    if (this.autoSend) {
      this.login_.restorePwd(this.emailAccount, this.confirmationMessage)
    } else {
      this.onSubmit.emit()
    }
  }
}
