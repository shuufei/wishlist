import { Routes, RouterModule } from '@angular/router';
import { MylistPageComponent } from './mylist-page.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: MylistPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MylistPageRoutingModule {}
