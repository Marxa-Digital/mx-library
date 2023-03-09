import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MxFieldsModule } from '@marxa/forms';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { FormsRoutingModule } from './forms-routing.module';
import { FormsComponent } from './forms.component';


@NgModule({
  declarations: [FormsComponent, TextFieldComponent],
  imports: [
    CommonModule,
    FormsRoutingModule,
    MxFieldsModule
  ]
})
export class FormsModule { }
