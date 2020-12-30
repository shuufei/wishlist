import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { MylistDataAccess } from './interface/mylist-data-access';
import { MylistStore } from './interface/mylist-store';

@Injectable({
  providedIn: 'root',
})
export class MylistFacadeService {
  readonly mylist$ = this.store.list$();

  constructor(
    private dataAccessService: MylistDataAccess,
    private store: MylistStore
  ) {}

  loadMylist() {
    return this.dataAccessService
      ?.list()
      .pipe(tap((items) => this.store.set(items)));
  }
}
