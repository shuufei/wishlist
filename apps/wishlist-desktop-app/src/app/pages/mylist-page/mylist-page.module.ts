import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RxState } from '@rx-angular/state';
import { UiModule } from '@wishlist/shared/ui';
import { MylistFacadeService } from '@wishlist/mylist/feature-shell';
import { MylistFeatureShellModule } from '@wishlist/mylist/feature-shell';
import {
  ApiClientForInMemoryDbService,
  MylistSharedDataAccessModule,
} from '@wishlist/mylist/shared/data-access';
import {
  MylistSharedStoreModule,
  MylistStoreService,
  State,
} from '@wishlist/mylist/shared/store';
import { MylistPageComponent } from './mylist-page.component';
import { MylistPageRoutingModule } from './mylist-page-routing.module';

@NgModule({
  declarations: [MylistPageComponent],
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
    MylistPageRoutingModule,
    UiModule,
    MylistFeatureShellModule,
    MylistSharedDataAccessModule,
    MylistSharedStoreModule,
  ],
})
export class MylistPageModule {}
