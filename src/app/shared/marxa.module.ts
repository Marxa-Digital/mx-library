import { NgModule } from '@angular/core';

import {
  MxColorsModule,
  MxResponsiveModule,
  MxDateTimeModule,
  MxTextModule,
} from "projects/marxa/devkit/src/public-api";
import { MxAuthModule } from 'projects/marxa/auth/src/public-api';
import { MxCrudPanelModule } from 'projects/marxa/crud-panel/src/public-api';
import { MxIndexModule } from "@marxa/index";
import { MxNavbarModule } from "projects/marxa/navbar/src/public-api";
import { MxSliderModule } from "projects/marxa/slider/src/public-api";
import { MxStorageModule } from 'projects/marxa/storage/src/public-api';
import { MxSocialShareModule } from "projects/marxa/social-share/src/public-api";

@NgModule({
  exports: [
    MxAuthModule,
    MxCrudPanelModule,
    MxColorsModule,
    MxResponsiveModule,
    MxDateTimeModule,
    MxTextModule,
    MxIndexModule,
    MxNavbarModule,
    MxSliderModule,
    MxStorageModule,
    MxSocialShareModule,
  ]
})
export class MarxaModule {}
