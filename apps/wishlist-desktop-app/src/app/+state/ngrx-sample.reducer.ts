import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as NgrxSampleActions from './ngrx-sample.actions';
import { NgrxSampleEntity } from './ngrx-sample.models';

export const NGRX_SAMPLE_FEATURE_KEY = 'ngrxSample';

export interface State extends EntityState<NgrxSampleEntity> {
  selectedId?: string | number; // which NgrxSample record has been selected
  loaded: boolean; // has the NgrxSample list been loaded
  error?: string | null; // last known error (if any)
}

export interface NgrxSamplePartialState {
  readonly [NGRX_SAMPLE_FEATURE_KEY]: State;
}

export const ngrxSampleAdapter: EntityAdapter<NgrxSampleEntity> = createEntityAdapter<
  NgrxSampleEntity
>();

export const initialState: State = ngrxSampleAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const ngrxSampleReducer = createReducer(
  initialState,
  on(NgrxSampleActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(NgrxSampleActions.loadNgrxSampleSuccess, (state, { ngrxSample }) =>
    ngrxSampleAdapter.setAll(ngrxSample, { ...state, loaded: true })
  ),
  on(NgrxSampleActions.loadNgrxSampleFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return ngrxSampleReducer(state, action);
}
