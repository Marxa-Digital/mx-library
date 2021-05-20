import { Component,  AfterViewInit, OnDestroy, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { pluck, startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'mx-reactive-textline',
  templateUrl: './mx-reactive-textline.component.html',
  styleUrls: ['./mx-reactive-textline.component.scss']
})
export class MxReactiveTextlineComponent implements AfterViewInit, OnDestroy {

  @Input() text: string = ''
  @Input() label: string = ''
  textSub: Subscription = {} as Subscription
  @ViewChild( 'textLine' ) mensajeInput: any;
  @Output() onTextEvent: EventEmitter<string> = new EventEmitter()

  constructor() { }

  ngAfterViewInit() {
    this.listenText()
  }

  listenText() {
    this.textSub = fromEvent<KeyboardEvent>( this.mensajeInput.nativeElement, 'keyup' ).pipe(
      pluck<KeyboardEvent, string>( 'target', 'value' ),
      startWith( this.text ? this.text : '' ),
      debounceTime( 500 ),
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
