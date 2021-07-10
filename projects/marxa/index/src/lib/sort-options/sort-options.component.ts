import { Component, OnInit, Input } from '@angular/core';
import { MxIndex } from '../mx-index.service';

@Component({
  selector: 'mx-sort-options',
  templateUrl: './sort-options.component.html',
  styleUrls: ['./sort-options.component.scss']
})
export class MxSortOptionsComponent implements OnInit {

  /** Waits for the filed to filter  */
  @Input() filterByField: string = ''
  /** The fields paths to query the content of the collection. It's required if `sortOptions` o `compareOptions` is `true`*/
  @Input() fields: string[] = []
  /** Activates the sortSelectInput. To it works need define `sort_fields` */
  @Input() sortOption: boolean = true
  /** Activates the filterOption. To it works need define `sort_fields` */
  @Input() filterOption: boolean = true

  constructor(public index: MxIndex  ) { }

  ngOnInit(): void {
    if (this.filterByField) this.index.field = this.filterByField
  }

  setCriteriaValue( value: any ) {
    this.index.setCriteriaFilter(value.target.value)
  }

}
