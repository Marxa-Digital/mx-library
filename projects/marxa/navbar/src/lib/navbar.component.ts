import { MxAuth } from '@marxa/auth/src/lib/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { MxNavbarService } from './navbar.service';
import firebase from 'firebase/app'
import { MxNavbarMenuNode } from './navlink.interface';

@Component({
  selector: 'mx-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class MxNavbarComponent implements OnInit {

  @Input() appTitle: string = ''
  @Input() unloggedPath: string = ''
  @Input() menuStructure: MxNavbarMenuNode[] = [
  ]

  user: firebase.User | null = null
  constructor(
    public auth: MxAuth,
    public navbarService: MxNavbarService
  ) { }

  async ngOnInit() {
    if (this.unloggedPath) this.auth.unloggedPath = this.unloggedPath
    this.auth.user$.subscribe(user => this.user = user)
  }

}


