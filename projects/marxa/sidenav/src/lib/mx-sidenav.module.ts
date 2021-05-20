import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MxSidenavComponent } from './mx-sidenav.component';
import { MxColorsModule } from '../color/mx-colors.module';
import { MaterialModule } from '../../shared/material.module';



@NgModule({
  declarations: [
    MxSidenavComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    MxColorsModule
  ],
  exports: [
    MxSidenavComponent
  ]
})
export class MxSidenavModule { }
