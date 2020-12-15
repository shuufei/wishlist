import { NgrxSampleEntity } from './ngrx-sample.models';
import { State, ngrxSampleAdapter, initialState } from './ngrx-sample.reducer';
import * as NgrxSampleSelectors from './ngrx-sample.selectors';

describe('NgrxSample Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getNgrxSampleId = (it) => it['id'];
  const createNgrxSampleEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as NgrxSampleEntity);

  let state;

  beforeEach(() => {
    state = {
      ngrxSample: ngrxSampleAdapter.setAll(
        [
          createNgrxSampleEntity('PRODUCT-AAA'),
          createNgrxSampleEntity('PRODUCT-BBB'),
          createNgrxSampleEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('NgrxSample Selectors', () => {
    it('getAllNgrxSample() should return the list of NgrxSample', () => {
      const results = NgrxSampleSelectors.getAllNgrxSample(state);
      const selId = getNgrxSampleId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = NgrxSampleSelectors.getSelected(state);
      const selId = getNgrxSampleId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getNgrxSampleLoaded() should return the current 'loaded' status", () => {
      const result = NgrxSampleSelectors.getNgrxSampleLoaded(state);

      expect(result).toBe(true);
    });

    it("getNgrxSampleError() should return the current 'error' state", () => {
      const result = NgrxSampleSelectors.getNgrxSampleError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
