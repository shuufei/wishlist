import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RxState } from '@rx-angular/state';
import { UiModule } from '@wishlist/shared/ui';
import { MylistFacadeService } from '@wishlist/mylist/feature-shell';
import { MylistFeatureShellModule } from '@wishlist/mylist/feature-shell';
import { MylistSharedDataAccessModule } from '@wishlist/mylist/infrastructure/data-access';
import {
  MylistSharedStoreModule,
  MylistStoreService,
  State,
} from '@wishlist/mylist/infrastructure/store';
import { MylistPageComponent } from './mylist-page.component';
import { MylistPageRoutingModule } from './mylist-page-routing.module';
import { AddItemFormComponent } from './components/add-item-form/add-item-form.component';
import { ApiClientService } from '@wishlist/mylist/infrastructure/data-access';
import { Apollo } from 'apollo-angular';

@NgModule({
  declarations: [MylistPageComponent, AddItemFormComponent],
  providers: [
    {
      provide: MylistFacadeService,
      deps: [Apollo, RxState],
      useFactory: (apollo: Apollo, state: RxState<State>) =>
        new MylistFacadeService(
          new ApiClientService(apollo),
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
