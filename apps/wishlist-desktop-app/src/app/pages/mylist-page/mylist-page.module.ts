import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RxState } from '@rx-angular/state';
import { UiModule } from '@wishlist/shared/ui';
import { MylistFacadeService } from '@wishlist/mylist/feature-shell';
import { MylistFeatureShellModule } from '@wishlist/mylist/feature-shell';
import {
  ApiClientForInMemoryDbService,
  MylistSharedDataAccessModule,
} from '@wishlist/mylist/infrastructure/data-access';
import {
  MylistSharedStoreModule,
  MylistStoreService,
  State,
} from '@wishlist/mylist/infrastructure/store';
import { MylistPageComponent } from './mylist-page.component';
import { MylistPageRoutingModule } from './mylist-page-routing.module';
import { AddItemFormComponent } from './components/add-item-form/add-item-form.component';

@NgModule({
  declarations: [MylistPageComponent, AddItemFormComponent],
  providers: [
    {
      provide: MylistFacadeService,
      deps: [HttpClient, RxState],
      useFactory: (http: HttpClient, state: RxState<State>) =>
        new MylistFacadeService(
          new ApiClientForInMemoryDbService(http),
          new MylistStoreService(state)
        ),
    },
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MylistPageRoutingModule,
    UiModule,
    MylistFeatureShellModule,
    MylistSharedDataAccessModule,
    MylistSharedStoreModule,
  ],
})
export class MylistPageModule {}
