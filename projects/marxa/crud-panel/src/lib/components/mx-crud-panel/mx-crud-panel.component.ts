import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Input, TemplateRef, Output, EventEmitter, Injector, OnDestroy } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'mx-crud-panel',
  templateUrl: './mx-crud-panel.component.html',
  styleUrls: ['./mx-crud-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs:"mxCrudPanel"
})
export class MxCrudPanel implements OnInit, OnDestroy {

  itemSelected: any
  List: any[] = []
  private _list : BehaviorSubject<any> = new BehaviorSubject([]);
  @Input() set list(variable: any) { this._list.next(variable); }
  get list() { return this._list.getValue()}

  @Input() listName: string = ''
  @Input() itemSelector: string = ''
  @Input() selectTemplate: TemplateRef<any> = {} as TemplateRef<any>
  @Input() addTemplate: TemplateRef<any> = {} as TemplateRef<any>
  @Input() height_vh: any

  private injectData?: Injector
  itemCtx: any
  // @ContentChild()

  @ViewChild( 'currentItem' ) public itemSelectedPanel?: MatDrawer
  @ViewChild( 'listPanel' ) public listPanel?: MatSelectionList
  @ViewChild( 'addItem' ) public addItemPanel?: MatDrawer


  @Output() onAdd: EventEmitter<any> = new EventEmitter()
  @Output() onSave: EventEmitter<any> = new EventEmitter()

  private listSubscription!: Subscription

  constructor () { }

  ngOnInit(): void {
    this.listSubscription =
    this._list.subscribe(list => {
      this.list = list
    })
  }

  closePanel() {
    console.log('close')
    console.log( this.addItemPanel?.opened )
    this.addItemPanel?.close()
    this.itemSelectedPanel?.close()
    this.listPanel?.deselectAll()
    this.itemSelected = undefined
  }


  onItemSelected( selected: MatSelectionListChange ) {
    if ( this.itemSelectedPanel ) {
      if ( this.itemSelectedPanel.opened ) { this.itemSelectedPanel.close() }
    }
    this.itemSelected = selected.options[0].value
    this.itemCtx = {item: this.itemSelected}
    this.itemSelectedPanel?.open()
  }

  closeAddPanel() {
    this.addItemPanel?.close()
  }

  save() {
    this.addItemPanel?.close()
    this.onSave.emit()

  }

  ngOnDestroy() {
    this.listSubscription.unsubscribe()
  }


}
