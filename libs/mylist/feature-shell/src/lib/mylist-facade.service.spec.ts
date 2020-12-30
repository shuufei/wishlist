import { TestBed } from '@angular/core/testing';

import { MylistFacadeService } from './mylist-facade.service';

describe('MylistFacadeService', () => {
  let service: MylistFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MylistFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
