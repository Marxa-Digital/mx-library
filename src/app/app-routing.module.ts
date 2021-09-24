import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StorageComponent } from './test/storage/storage.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: 'test', component: TestComponent, children:[
    { path: 'storage', component: StorageComponent
   },
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
