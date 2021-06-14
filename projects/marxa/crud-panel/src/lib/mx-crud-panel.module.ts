import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { MxCrudPanel } from './components/mx-crud-panel/mx-crud-panel.component';



@NgModule({
  declarations: [
    MxCrudPanel
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MxCrudPanel
  ]
})
export class MxCrudPanelModule { }
