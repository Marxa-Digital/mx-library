import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "@angular/fire";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirebaseModule } from './shared/firebase.module';
import {environment} from '../environments/environment'
import { MarxaModule } from './shared/marxa.module';
import { MaterialModule } from './shared/material.module';
import { TestComponent } from './test/test.component';
import { DatePipe } from '@angular/common';
import { StorageComponent } from './test/storage/storage.component';
// import { MxDevkitModule } from './mx-devkit/marxa-devkit.module';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    StorageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FirebaseModule,
    MaterialModule,
    MarxaModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    DatePipe
  ],
  schemas: [
    // CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
