import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  NGRX_SAMPLE_FEATURE_KEY,
  State,
  NgrxSamplePartialState,
  ngrxSampleAdapter,
} from './ngrx-sample.reducer';

// Lookup the 'NgrxSample' feature state managed by NgRx
export const getNgrxSampleState = createFeatureSelector<
  NgrxSamplePartialState,
  State
>(NGRX_SAMPLE_FEATURE_KEY);

const { selectAll, selectEntities } = ngrxSampleAdapter.getSelectors();

export const getNgrxSampleLoaded = createSelector(
  getNgrxSampleState,
  (state: State) => state.loaded
);

export const getNgrxSampleError = createSelector(
  getNgrxSampleState,
  (state: State) => state.error
);

export const getAllNgrxSample = createSelector(
  getNgrxSampleState,
  (state: State) => selectAll(state)
);

export const getNgrxSampleEntities = createSelector(
  getNgrxSampleState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getNgrxSampleState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getNgrxSampleEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
