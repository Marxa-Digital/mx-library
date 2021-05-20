import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MxLoginFields } from '../../auth.model';

@Component({
  selector: 'mx-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent implements OnInit {

  fields: MxLoginFields = {
    email: '', password:''
  }

  hide = true;

  @Input() public signInTitle:string = 'Iniciar sesión'
  @Input() public emailLabel:string = 'Email'
  @Input() public passwordLabel:string = 'Contraseña'
  @Input() public forgotPasswordLabel:string = 'Olvidé mi contraseña'
  @Input() public signInButton: string = 'Iniciar'
  @Input() public sendButtonColor: 'primary' | 'accent' | 'warn' = 'primary'

  @Input() color: string = ''
  @Input() background: string = ''

  @Output() onSubmit = new EventEmitter<MxLoginFields>()
  @Output() restorePwd = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

}


