import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MxCapitalizePipe } from './mx-capitalize.pipe';

// import { CompareValidatorDirective } from './validator.directive';
import { MxLowecaseDirective } from './directives/lowercase.directive';
import { MxNormalizeDirective } from './directives/normalize.directive';
import { MxPreventSpacesDirective } from './directives/prevent-spaces.directive';
import { MaterialModule } from '../../shared/material.module';



@NgModule({
  declarations: [
    MxCapitalizePipe,
    MxLowecaseDirective,
    MxNormalizeDirective,
    MxPreventSpacesDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    MxCapitalizePipe,
    MxLowecaseDirective,
    MxNormalizeDirective,
    MxPreventSpacesDirective,
  ]
})
export class MxTextModule { }
