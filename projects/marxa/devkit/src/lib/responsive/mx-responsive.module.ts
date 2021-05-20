import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MxResponsiveDirective } from './directives/responsive.directive';
import { MxStretchHeightDirective } from './directives/stretchHeight.directive';
import { MxFixScroll } from './directives/fix-scroll.directive';



@NgModule({
  declarations: [
    MxResponsiveDirective,
    MxStretchHeightDirective,
    MxFixScroll
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MxResponsiveDirective,
    MxStretchHeightDirective,
    MxFixScroll
  ]
})
export class MxResponsiveModule { }
