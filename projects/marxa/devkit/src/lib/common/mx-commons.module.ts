import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MxStopPropagationDirective } from './directives/stop-propagation.directive';
import { MxListFilterPipe } from './pipes/list-filter.pipe';



@NgModule({
  declarations: [
    MxStopPropagationDirective,
    MxListFilterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MxStopPropagationDirective,
    MxListFilterPipe
  ]
})
export class MxCommonsModule { }
