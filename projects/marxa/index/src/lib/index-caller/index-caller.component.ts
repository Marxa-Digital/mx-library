import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { mxIndexCenterMessage, mxIndexEvent } from '../mx-index.model';
import { MxIndex } from '../mx-index.service';

@Component({
  selector: 'mx-index-caller',
  templateUrl: './index-caller.component.html',
  styleUrls: ['./index-caller.component.scss'],
})
export class MxIndexCallerComponent implements OnInit, OnDestroy {

  @Input() prevBtn: string = 'Anterior'
  @Input() nextBtn: string = 'Siguiente'
  @Input() colorBtn: ThemePalette = 'primary'
  @Input() centerMessage: mxIndexCenterMessage = {
    showing: 'Mostrando',
    from: 'del',
    to: 'al'
  }

  @Input() merge: boolean = false
  @Output() pageEvent: EventEmitter<mxIndexEvent> = new EventEmitter()
  public first: number = 0
  public last: number = 0
  public prodCant: number = 0
  public noMore: boolean = false
  private eventSubscription!: Subscription
  constructor ( public _index: MxIndex ) {
   }

  ngOnInit() {
    if ( this.merge == true ) this._index.mergeQuery = this.merge
    this.eventSubscription =
    this._index.indexEvent.subscribe( (data:mxIndexEvent) => {
      this.first = data.firstIndex
      this.last = data.lastIndex
      this.noMore = this._index.queryCant > data.pageSize
      this.pageEvent.emit(data)
    })
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe()
  }


}
