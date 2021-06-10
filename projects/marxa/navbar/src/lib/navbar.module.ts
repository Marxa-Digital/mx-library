import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MxNavbarComponent } from "./navbar.component";
import { MxNavbarLoginComponent } from './login/login.component';
import { MxColorsModule, MxResponsiveModule } from '@marxa/devkit';
import { MaterialModule } from '../shared/material.module';
import { MxAuthModule } from '@marxa/auth';
import { MxSearchModule } from '@marxa/search';

@NgModule({
  declarations: [
    MxNavbarComponent,
    MxNavbarLoginComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    MxColorsModule,
    MxAuthModule,
    MxResponsiveModule,
    MxSearchModule
  ],
  exports: [
    MxNavbarComponent,
    MxNavbarLoginComponent
  ],
})
export class MxNavbarModule { }
