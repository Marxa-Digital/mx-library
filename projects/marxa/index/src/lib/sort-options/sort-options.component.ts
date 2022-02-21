import { MatSelectChange } from '@angular/material/select';
import { Component, OnInit, Input, AfterViewInit, ChangeDetectionStrategy, OnChanges, Output, EventEmitter } from '@angular/core';
import { MxIndex } from '../mx-index.service';
import { mxSortCriteria } from '../mx-index.model';

@Component({
  selector: 'mx-sort-options',
  templateUrl: './sort-options.component.html',
  styleUrls: [ './sort-options.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MxSortOptionsComponent implements OnChanges, OnInit, AfterViewInit {

  /** Waits for the filed to filter  */
  @Input() filterByField: string = ''
  /** The fields paths to query the content of the collection. It's required if `sortOptions` o `compareOptions` is `true`*/
  @Input() fields: string[] = []
  /** Activates the sortSelectInput. To it works need define `sort_fields` */
  @Input() sortOption: boolean = true
  /** Activates the filterOption. To it works need define `sort_fields` */
  @Input() filterOption: boolean = true
  /** Allows set criteria by default values by array of them */
  @Input() options?: string[]

  @Output() criteriaSearched: EventEmitter<mxSortCriteria> = new EventEmitter<mxSortCriteria>()

  constructor ( public index: MxIndex ) { }

  ngOnChanges() {
    if ( this.filterByField ) {
      this.index.field = this.filterByField
    }
    if ( this.options && this.options.length > 0 ) {
      this.index.setCriteriaFilter( this.options[0] )
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  async setCriteriaValue( value: any ) {
    let sortCriteria = await this.index.setCriteriaFilter(
      'target' in value
        ? value.target.value
        : value.value
    )
    this.criteriaSearched.emit( sortCriteria )

  }

}
