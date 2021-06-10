import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MxSocialShareComponent } from './social-share.component';
import { MaterialModule } from '../shared/material.module';



@NgModule({
  declarations: [
    MxSocialShareComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MxSocialShareComponent
  ]
})
export class MxSocialShareModule { }
