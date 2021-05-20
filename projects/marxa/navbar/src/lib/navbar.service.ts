import { Injectable, EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { MxNavlink } from './navlink.interface';

@Injectable({providedIn: 'root'})
export class MxNavbarService {


    _setMobileNavBar: Subject<MxNavlink[]> = new Subject()
    public toggleMobileMenu: EventEmitter<boolean> = new EventEmitter()

    constructor () { }

    setMobileNavbar(navbar: MxNavlink[]) {
        return this._setMobileNavBar.next(navbar)
    }

    switchMobileMenu() {
        this.toggleMobileMenu.emit(true)
    }

}


