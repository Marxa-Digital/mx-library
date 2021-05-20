import { Directive, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Directive( {

    selector: '[normalize]',

} )
export class MxNormalizeDirective {
    constructor ( private ref: ElementRef ) {
        fromEvent( this.ref.nativeElement, 'keyup' ).pipe(
            pluck<any, string>( 'target', 'value' ),
        ).subscribe( text => {
            let nText = text.normalize( 'NFD' ).replace( /[\u0300-\u036f]/g, "" );
            this.ref.nativeElement.value = nText
        } )
    }
}
