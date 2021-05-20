import { Injectable } from '@angular/core';
import { MxSidenavNode } from './mx-sidenav.interface';

@Injectable({
  providedIn: 'root'
})
export class MxSidenavService {

  structure: MxSidenavNode[] = []
  constructor () { }

}
