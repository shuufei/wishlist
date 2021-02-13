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

import { HttpClientModule } from '@angular/common/http';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

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
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:3333',
          }),
        };
      },
      deps: [HttpLink],
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
    HttpClientModule,
  ],
})
export class MylistPageModule {}
