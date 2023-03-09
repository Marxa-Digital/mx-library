import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextFieldComponent } from './components/text-field/text-field.component';

import { FormsComponent } from './forms.component';

const routes: Routes = [{ path: '', component: FormsComponent, children: [
  { path: 'text', component: TextFieldComponent}
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
