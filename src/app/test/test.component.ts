import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MxIndex } from 'projects/marxa/index/src/public-api';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {

  motos: any
  constructor(
    private _index: MxIndex,
  ) { }

  ngOnInit(): void {
    this.loadProducts()
  }

  async loadProducts() {
    this._index.initIndex( 'catalogo', 'id', 10, 'asc', false )
    this.motos = this._index.queryData
  }

  next() {
    this._index.changePage('next')
  }

  prev() {
    this._index.changePage('prev')
  }

}
