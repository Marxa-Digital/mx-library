import { NgModule } from '@angular/core';
import { ComunesModule } from '../shared/comunes.module';
import { MaterialModule } from '../shared/material.module';
import { MxAlertModule } from './alert/alert.module';
import { MxCacheModule } from './cache/mx-cache.module';
import { MxColorsModule } from './color/mx-colors.module';
import { MxCommonsModule } from './common/mx-commons.module';
import { MxDateTimeModule } from './date-time/mx-date.module';
import { MxLoadingModule } from './loading/loading.module';
import { MxResponsiveModule } from './responsive/mx-responsive.module';
import { MxTextModule } from './text/mx-text.module';



@NgModule({
  imports: [
    ComunesModule,
    MaterialModule,
    MxAlertModule,
    MxCacheModule,
    MxColorsModule,
    MxCommonsModule,
    MxDateTimeModule,
    MxLoadingModule,
    MxResponsiveModule,
    MxTextModule,
  ],
  exports: [
    MxAlertModule,
    MxCacheModule,
    MxColorsModule,
    MxCommonsModule,
    MxDateTimeModule,
    MxLoadingModule,
    MxResponsiveModule,
    MxTextModule,
  ]
})
export class MxDevkitModule { }
