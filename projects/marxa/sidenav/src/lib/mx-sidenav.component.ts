import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { MxSidenavNode } from './mx-sidenav.interface';
import { Location } from '@angular/common';
import { MxSidenavService } from './mx-sidenav.service';


@Component({
  selector: 'mx-sidenav',
  templateUrl: './mx-sidenav.component.html',
  styleUrls: ['./mx-sidenav.component.scss']
})
export class MxSidenavComponent implements  AfterViewInit {

  @Input() structure: MxSidenavNode[] = []
  @Input() fontColor: string = ''
  @Input() backgroundColor: string = ''

  constructor (
    public location: Location,
    public _sidenav: MxSidenavService
  ) { }

  ngAfterViewInit() {
    if (this.structure.length == 0) {
      this.structure = this._sidenav.structure.length > 0
        ? this._sidenav.structure : this.structure
    }
  }

  enableChilds(list:MxSidenavNode[]):MxSidenavNode[] {
    return list.filter(i => !i.disable)
  }


  onActive( path: string | string[] ) {
    if ( typeof path === 'string' ) {
      return this.location.path().includes( path )
    } else {
      let finded: boolean = false
      path.forEach( id => {
        if ( this.location.path().includes( id ) )
          finded = true
      })
      return finded
    }
  }



}
