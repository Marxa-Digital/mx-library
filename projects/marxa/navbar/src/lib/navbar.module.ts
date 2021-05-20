import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MxNavbarComponent } from "./navbar.component";
import { MxNavbarLoginComponent } from './login/login.component';
import { MxColorsModule } from '../color/mx-colors.module';
import { MxAuthModule } from '@marxa/auth/src/lib/auth.module';
import { MaterialModule } from 'projects/marxa/devkit/shared/material.module';

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
    MxAuthModule
  ],
  exports: [
    MxNavbarComponent,
    MxNavbarLoginComponent
  ],
})
export class MxNavbarModule { }
