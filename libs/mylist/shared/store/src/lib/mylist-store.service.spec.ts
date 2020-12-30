import { TestBed } from '@angular/core/testing';

import { MylistStoreService } from './mylist-store.service';

describe('MylistStoreService', () => {
  let service: MylistStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MylistStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
