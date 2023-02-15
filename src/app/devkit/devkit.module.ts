import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MxErrorsHandle, MxErrorsModule } from '@marxa/devkit';
import { MaterialModule } from '../shared/material.module';

import { DevkitRoutingModule } from './devkit-routing.module';
import { DevkitComponent } from './devkit.component';
import { ErrorsHandleComponent } from './errors-handle/errors-handle.component';
import { ERRORS_HANDLE_CONFIG } from './errors-handle/errors.config';

@NgModule({
  declarations: [DevkitComponent, ErrorsHandleComponent],
  imports: [CommonModule, DevkitRoutingModule, MaterialModule, MxErrorsModule],
  providers: [
    MxErrorsHandle,
    ERRORS_HANDLE_CONFIG
    // ERRORS_CONFIG_PROVIDER
  ]
})
export class DevkitModule {}
