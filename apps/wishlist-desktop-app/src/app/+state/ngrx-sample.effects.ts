import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as NgrxSampleFeature from './ngrx-sample.reducer';
import * as NgrxSampleActions from './ngrx-sample.actions';

@Injectable()
export class NgrxSampleEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NgrxSampleActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return NgrxSampleActions.loadNgrxSampleSuccess({ ngrxSample: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return NgrxSampleActions.loadNgrxSampleFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
