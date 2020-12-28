import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/mylist',
    pathMatch: 'full',
  },
  {
    path: 'mylist',
    loadChildren: () =>
      import('./pages/mylist-page/mylist-page.module').then(
        (m) => m.MylistPageModule
      ),
  },
  {
    path: '**',
    redirectTo: '/mylist',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
