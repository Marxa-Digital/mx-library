import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MxLastTimerComponent } from './timer/last-timer.component';
import { MxTimePipe } from './pipes/mx-time.pipe';



@NgModule({
  declarations: [
    MxLastTimerComponent,
    MxTimePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MxLastTimerComponent,
    MxTimePipe
  ]
})
export class MxDateTimeModule { }
