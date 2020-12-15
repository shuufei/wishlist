import { createAction, props } from '@ngrx/store';
import { NgrxSampleEntity } from './ngrx-sample.models';

export const init = createAction('[NgrxSample Page] Init');

export const loadNgrxSampleSuccess = createAction(
  '[NgrxSample/API] Load NgrxSample Success',
  props<{ ngrxSample: NgrxSampleEntity[] }>()
);

export const loadNgrxSampleFailure = createAction(
  '[NgrxSample/API] Load NgrxSample Failure',
  props<{ error: any }>()
);
