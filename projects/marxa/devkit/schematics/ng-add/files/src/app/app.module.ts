import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MarxaModule } from './shared/marxa.module';
import { MaterialModule } from './shared/material.module';
import { FirebaseModule } from './shared/firebase.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FirebaseModule,
    MaterialModule,
    MarxaModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
