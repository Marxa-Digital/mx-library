import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StorageComponent } from './test/storage/storage.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: 'test', component: TestComponent, children:[
    { path: 'storage', component: StorageComponent
   },
  ] },
  { path: 'devkit', loadChildren: () => import('./devkit/devkit.module').then(m => m.DevkitModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
