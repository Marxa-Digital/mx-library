import { OnDestroy } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { MatDrawer } from '@angular/material/sidenav';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MxSlide } from '../mx-slider.model';
import { MxSlider } from '../mx-slider.service';

@Component({
  selector: 'mx-mx-slider-crud',
  templateUrl: './mx-slider-crud.component.html',
  styleUrls: ['./mx-slider-crud.component.scss']
})
export class MxSliderCrudComponent implements OnInit, OnDestroy {

  slideSelected?: MxSlide
  list: MxSlide[] = []

  @Input() height_vh: number = 100
  @Input() collection: string = ''

  @ViewChild( 'currentItem' ) public itemPanel?: MatDrawer
  @ViewChild( 'listPanel' ) listPanel?: MatSelectionList
  @ViewChild( 'addItem' ) addPanel?: MatDrawer


  @Output() onAdded: EventEmitter<any> = new EventEmitter()
  @Output() onSaved: EventEmitter<any> = new EventEmitter()

  listSubscription: Subscription

  constructor (
    private _slides: MxSlider
  ) {
    this.listSubscription =
    this._slides.getSlidesList()
      .subscribe(list => { this.list = list })
   }

  ngOnInit(): void {

  }

  onCloseColeccion() {
    this.addPanel?.close()
    this.itemPanel?.close()
    this.listPanel?.deselectAll()
    this.slideSelected = undefined
  }


  onItemSelected( selected: MatSelectionListChange ) {
    if ( this.itemPanel ) {
      if ( this.itemPanel.opened ) { this.itemPanel.close() }
    }
    this.slideSelected = selected.options[0].value
    this.itemPanel?.open()
  }

  onChanges(event: any) {
    this.slideSelected = { ...this.slideSelected, ...event}
  }

  onAddSlide() {
    if (this.slideSelected)
    this._slides.addSlide(this.slideSelected, this.collection )
  }

  onUpdateSlide() {
    if (this.slideSelected) {
      this._slides.updateSlide(this.slideSelected, this.collection)
    }
  }

  closeAddPanel() {
    this.addPanel?.close()
  }

  save() {
    this.addPanel?.close()
    this.onSaved.emit()

  }

  ngOnDestroy() {
    this.listSubscription.unsubscribe()
  }


}
