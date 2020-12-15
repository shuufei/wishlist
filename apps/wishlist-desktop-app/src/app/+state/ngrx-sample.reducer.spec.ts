import { NgrxSampleEntity } from './ngrx-sample.models';
import * as NgrxSampleActions from './ngrx-sample.actions';
import { State, initialState, reducer } from './ngrx-sample.reducer';

describe('NgrxSample Reducer', () => {
  const createNgrxSampleEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as NgrxSampleEntity);

  beforeEach(() => {});

  describe('valid NgrxSample actions', () => {
    it('loadNgrxSampleSuccess should return set the list of known NgrxSample', () => {
      const ngrxSample = [
        createNgrxSampleEntity('PRODUCT-AAA'),
        createNgrxSampleEntity('PRODUCT-zzz'),
      ];
      const action = NgrxSampleActions.loadNgrxSampleSuccess({ ngrxSample });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
