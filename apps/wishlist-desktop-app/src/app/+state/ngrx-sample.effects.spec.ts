import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { NgrxSampleEffects } from './ngrx-sample.effects';
import * as NgrxSampleActions from './ngrx-sample.actions';

describe('NgrxSampleEffects', () => {
  let actions: Observable<any>;
  let effects: NgrxSampleEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        NgrxSampleEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(NgrxSampleEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: NgrxSampleActions.init() });

      const expected = hot('-a-|', {
        a: NgrxSampleActions.loadNgrxSampleSuccess({ ngrxSample: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
