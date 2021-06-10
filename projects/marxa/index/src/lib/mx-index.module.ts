import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { MxIndexCallerComponent } from './index-caller/index-caller.component';
import { MxSortOptionsComponent } from './sort-options/sort-options.component';
import { MxSortPipe } from './mx-sort.pipe';



@NgModule({
  declarations: [
    MxIndexCallerComponent,
    MxSortOptionsComponent,
    MxSortPipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    MxIndexCallerComponent,
    MxSortOptionsComponent,
    MxSortPipe
  ]
})
export class MxIndexModule { }
