import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

@NgModule({
  imports: [
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
      delay: 500,
    }),
  ],
})
export class MylistSharedDataAccessModule {}
