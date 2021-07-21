import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarxaModule } from './shared/marxa.module';
import { MaterialModule } from './shared/material.module';
import { FirebaseModule } from './shared/firebase.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FirebaseModule,
    MaterialModule,
    MarxaModule,
  ]
})
export class AppModule { }
