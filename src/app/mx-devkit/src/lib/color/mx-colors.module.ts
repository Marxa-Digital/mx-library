import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MxColorDirective } from './directives/color.directive';
import { MxRandomBackgroudDirective } from './directives/random-background.directive';



@NgModule({
  declarations: [
    MxColorDirective,
    MxRandomBackgroudDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MxColorDirective,
    MxRandomBackgroudDirective
  ]
})
export class MxColorsModule { }
