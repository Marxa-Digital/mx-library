import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[mxStopPropagation]'
})
export class MxStopPropagationDirective {

  @HostListener( "click", [ "$event" ] )
  public onClick( event: any ): void {
    event.stopPropagation();
  }

  constructor() { }

}
