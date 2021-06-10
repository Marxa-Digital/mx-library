import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MxDevkitModule } from '../mx-devkit/marxa-devkit.module';
import { MxStorageModule } from '../mx-storage/mx-storage.module';

@NgModule({
  imports: [
    CommonModule,
    MxDevkitModule,
    MxStorageModule
  ], exports: [
    MxDevkitModule,
    MxStorageModule
  ]
})
export class MarxaModule {
}
