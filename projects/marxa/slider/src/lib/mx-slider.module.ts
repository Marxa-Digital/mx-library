import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCarouselModule } from './mat-carousel/carousel.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MxSliderComponent } from './mx-slider/mx-slider.component';
import { MxSliderConfigComponent } from './mx-slider-config/mx-slider-config.component';
import { FirebaseModule } from '../shared/firebase.module';
import { MxSliderCrudComponent } from './mx-slider-crud/mx-slider-crud.component';
import { MaterialModule } from '../shared/material.module';
import { MxSlideEditComponent } from './mx-slide-edit/mx-slide-edit.component';
import { MxStorageModule } from '@marxa/storage';




@NgModule({
  declarations: [
    MxSliderComponent,
    MxSliderConfigComponent,
    MxSliderCrudComponent,
    MxSlideEditComponent
  ],
  imports: [
    CommonModule,
    MatCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    FirebaseModule,
    MaterialModule,
    MxStorageModule
  ],
  exports: [
    MxSliderComponent,
    MxSliderConfigComponent,
    MatCarouselModule,
    MxSliderCrudComponent
  ]
})
export class MxSliderModule { }
