import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { startWith } from 'rxjs/operators';

@Component({
  selector: '  mx-reacvtive-dialogbox',
  templateUrl: './mx-reacvtive-dialogbox.component.html',
  styleUrls: ['./mx-reacvtive-dialogbox.component.scss']
})
export class MxReacvtiveDialogboxComponent implements AfterViewInit, OnDestroy {

  @Input() text: string = ''
  @Input() label: string = ''
  textSub: Subscription = new Subscription
  @ViewChild( 'dialgbox' ) mensajeInput: any
  @Output() onTextEvent: EventEmitter<string> = new EventEmitter()

  constructor() { }

  ngAfterViewInit() {
    this.listenText()
  }

  listenText() {
    this.textSub = fromEvent<KeyboardEvent>( this.mensajeInput.nativeElement, 'keyup' ).pipe(
      pluck<KeyboardEvent, string>( 'target', 'value' ),
      startWith(this.text ? this.text : ''),
      debounceTime( 1000 ),
      distinctUntilChanged()
    )

      .subscribe( text => {
        this.text = text
        this.onTextEvent.emit( this.text )
      } )
  }

  ngOnDestroy() {
    this.textSub.unsubscribe()
  }

}
