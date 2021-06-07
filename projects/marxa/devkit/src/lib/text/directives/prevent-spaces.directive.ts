import { Directive, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { pluck } from 'rxjs/operators';


@Directive({
  selector: '[mxPreventSpaces]',
})
export class MxPreventSpacesDirective {

  constructor ( private ref: ElementRef ) {
    fromEvent( this.ref.nativeElement, 'keyup' ).pipe(
      pluck<any, string>( 'target', 'value' ),
    ).subscribe( text => {
      let nText = text.valueOf().replace( /\s/g, '' )
      this.ref.nativeElement.value = nText
    })

  }



}
