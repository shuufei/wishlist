import { TestBed } from '@angular/core/testing';

import { ApiClientForInMemoryDbService } from './api-client-for-in-memory-db.service';

describe('ApiClientForInMemoryDbService', () => {
  let service: ApiClientForInMemoryDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiClientForInMemoryDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
