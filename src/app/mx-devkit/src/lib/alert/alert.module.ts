import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertPopupComponent } from './alert-popup/alert-popup.component';
import { ErrorPopupComponent } from './error-popup/error-popup.component';
import { MaterialModule } from '../../shared/material.module';
import { FirebaseModule } from '../../shared/firebase.module';



@NgModule({
  declarations: [
    AlertPopupComponent,
    ErrorPopupComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FirebaseModule
  ],
})
export class MxAlertModule { }
