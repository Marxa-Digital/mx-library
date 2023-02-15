import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DevkitComponent } from './devkit.component';
import { ErrorsHandleComponent } from './errors-handle/errors-handle.component';

const routes: Routes = [
  {
    path: '',
    component: DevkitComponent,
    children: [{ path: 'errors-handle', component: ErrorsHandleComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevkitRoutingModule {}
