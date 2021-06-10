import { Component, OnInit, OnChanges } from '@angular/core';
import { MxIndex } from '../mx-index.service';

@Component({
  selector: 'mx-index-caller',
  templateUrl: './index-caller.component.html',
  styleUrls: ['./index-caller.component.scss'],
})
export class MxIndexCallerComponent implements OnInit, OnChanges {

  public first: number = 0
  public last: number = 0
  public prodCant: number = 0
  constructor ( public _index: MxIndex ) {
   }

  ngOnInit() {
    this._index.indexEvent.subscribe( (data:any) => {
      this.first = data.firstIndex
      this.last = data.lastIndex
      this.prodCant = data.collectionSize
    })
  }

  ngOnChanges() {
    this._index.orderData.subscribe( data => {
      this.first = data.firstIndex
      this.last = data.lastIndex
      this.prodCant = data.collectionSize
    } )
  }


}
