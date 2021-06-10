import { Component, Input, OnInit } from '@angular/core';
import { MxNavbarService } from './navbar.service';
import firebase from 'firebase/app'
import { MxNavbarMenuNode } from './navlink.interface';
import { MxAuth } from '@marxa/auth';
import { MxResponsive } from '@marxa/devkit';

@Component({
  selector: 'mx-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class MxNavbarComponent implements OnInit {

  @Input() title: string = 'app-logo'
  @Input() logo: string = ''
  @Input() linkColor: string = '#202020'
  @Input() unloggedPath: string = ''
  @Input() menu: MxNavbarMenuNode[] = []
  @Input() showSearcher: boolean = false
  @Input() searcherLabel: string = ''
  @Input() showLogzone: boolean = false
  @Input() loginMethod: 'link' | 'google' | 'facebook' = 'link'
  @Input() loginButtonLabel: string = 'Ingresar'
  @Input() loginButtonLink: string = '/'

  user: firebase.User | null = null
  constructor(
    public auth: MxAuth,
    public navbarService: MxNavbarService,
    public responsive: MxResponsive
  ) { }

  async ngOnInit() {
    if (this.unloggedPath) this.auth.unloggedPath = this.unloggedPath
    this.auth.user$.subscribe(user => this.user = user)
  }

}


