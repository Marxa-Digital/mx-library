import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCarouselModule } from './mat-carousel/carousel.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MxSliderComponent } from './gdev-slider/mx-slider.component';
import { MxSliderConfigComponent } from './gdev-slider-config/mx-slider-config.component';
import { FirebaseModule } from '../../shared/firebase.module';




@NgModule({
  declarations: [
    MxSliderComponent,
    MxSliderConfigComponent
  ],
  imports: [
    CommonModule,
    MatCarouselModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    FirebaseModule
  ],
  exports: [
    MxSliderComponent,
    MxSliderConfigComponent,
    MatCarouselModule
  ]
})
export class MxSliderModule { }
