import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MxSidenavComponent } from './mx-sidenav.component';
import { MaterialModule } from '../shared/material.module';
import { MxDevkitModule } from '@marxa/devkit';



@NgModule({
  declarations: [
    MxSidenavComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    MxDevkitModule
  ],
  exports: [
    MxSidenavComponent
  ]
})
export class MxSidenavModule { }
