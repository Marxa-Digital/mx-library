import { Directive, Input, OnInit, ElementRef } from '@angular/core';
import { MxColor } from '../mx-color.service';

@Directive({
  selector: '[mxColor]',
})
export class MxColorDirective implements OnInit {

  @Input() background:  string
  @Input() color:  string

  paletteTypes: string[]
  constructor (
    private el: ElementRef,
    private _color: MxColor
  ) {
    this.paletteTypes = Object.keys(this._color.ColorPalette)
    this.background = ''
    this.color = ''
   }

  ngOnInit() {
    this.setColor()
    this.setBackground()
  }

  setColor() {
    if ( this.color ) {
      if (this.paletteTypes.includes(this.color)) {
        this.el.nativeElement.style.color = this._color.ColorPalette[ this.color ]
      } else {
        this.el.nativeElement.style.color = this.color
      }
    }
  }

  setBackground() {
    if ( this.background ){
      if (this.paletteTypes.includes(this.background)) {
        this.el.nativeElement.style.background = this._color.ColorPalette[ this.background ]
      } else {
        this.el.nativeElement.style.background = this.background
      }
    }
  }

}
