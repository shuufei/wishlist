import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromNgrxSample from './+state/ngrx-sample.reducer';
import { NgrxSampleEffects } from './+state/ngrx-sample.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    StoreModule.forRoot({}),
    StoreModule.forFeature(
      fromNgrxSample.NGRX_SAMPLE_FEATURE_KEY,
      fromNgrxSample.reducer
    ),
    EffectsModule.forRoot(),
    EffectsModule.forFeature([NgrxSampleEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
