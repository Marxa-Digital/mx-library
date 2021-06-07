import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MxLoadingComponent } from './loading.component';
import { MxWaitingBarComponent } from './components/waiting-bar/waiting-bar.component';
import { MxLoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { MaterialModule } from '../../shared/material.module';

@NgModule({
  declarations: [
    MxLoadingComponent,
    MxWaitingBarComponent,
    MxLoadingOverlayComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ], exports: [
    MxLoadingComponent,
    MxWaitingBarComponent,
    MxLoadingOverlayComponent
  ]
})
export class MxLoadingModule { }
