import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MxNavbarService } from './navbar.service';
import firebase from 'firebase/app'
import { MxNavbarMenuNode } from './navlink.interface';
import { MxAuth } from '@marxa/auth';
import { MxResponsive } from '@marxa/devkit';
import { Router } from '@angular/router';

@Component({
  selector: 'mx-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class MxNavbarComponent implements OnInit {

  @Input() title: string = 'app-logo'
  @Input() logo: string = ''
  @Input() fontColor: string = ''
  @Input() backgroundColor: string = ''
  @Input() linkColor: string = '#202020'
  @Input() activeLinkColor: string = '#202020'

  @Input() menu: MxNavbarMenuNode[] = []
  @Input() userMenu: MxNavbarMenuNode[] = []

  @Input() showSearcher: boolean = false
  @Input() searchCollection: string = ''
  @Input() searchSelector: string = ''
  @Input() searchTrigger: number = 0
  @Input() searcherLabel: string = ''

  @Input() showLogzone: boolean = false
  @Input() loginMethod: 'link' | 'google' | 'facebook' = 'link'
  @Input() loginButtonLabel: string = 'Ingresar'
  @Input() logoutLabel: string = 'Cerrar sesión'
  @Input() loginButtonLink: string = '/'
  @Input() unloggedPath: string = ''

  @Output() onSearch: EventEmitter<any> = new EventEmitter()
  @Output() onLogged: EventEmitter<any> = new EventEmitter()

  user: firebase.User | null = null
  constructor(
    public auth: MxAuth,
    public navbarService: MxNavbarService,
    public responsive: MxResponsive,
    private _router: Router
  ) {
    this.auth.unloggedPath = this.unloggedPath
   }

  async ngOnInit() {
    if (this.unloggedPath) this.auth.unloggedPath = this.unloggedPath
    this.auth.user$.subscribe(user => this.user = user)
  }

  logged(user: firebase.User) {
    this.user = user as firebase.User
    this.onLogged.emit(this.user)
  }

}


