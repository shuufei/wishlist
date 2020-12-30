import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { MylistDataAccess } from './interface/mylist-data-access';
import { MylistStore } from './interface/mylist-store';
import { WishlistItem } from '@wishlist/shared/domain';

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
      .list()
      .pipe(tap((items) => this.store.set(items)));
  }

  update(item: WishlistItem) {
    return this.dataAccessService
      .update(item)
      .pipe(tap(() => this.store.update(item)));
  }

  delete(id: WishlistItem['id']) {
    return this.dataAccessService
      .delete(id)
      .pipe(tap(() => this.store.remove(id)));
  }
}
