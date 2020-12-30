import { Injectable } from '@angular/core';
import { insert, remove, RxState, update } from '@rx-angular/state';
import { filter, map } from 'rxjs/operators';
import { MylistStore, WishlistItem } from '@wishlist/mylist/feature-shell';

export type State = {
  mylist: WishlistItem[];
};

@Injectable({
  providedIn: 'root',
})
export class MylistStoreService implements MylistStore {
  constructor(private state: RxState<State>) {}

  list$() {
    return this.state.select('mylist');
  }

  get$(id: WishlistItem['id']) {
    return this.state.select('mylist').pipe(
      map((items) => items.find((v) => v.id === id)),
      filter((v): v is WishlistItem => v != null)
    );
  }

  set(items: WishlistItem[]) {
    this.state.set('mylist', () => items);
  }

  add(item: WishlistItem) {
    this.state.set('mylist', (oldState) => insert(oldState.mylist, item));
  }

  remove(id: WishlistItem['id']) {
    this.state.set('mylist', (oldState) =>
      remove(oldState.mylist, [{ id }], 'id')
    );
  }

  update(item: WishlistItem) {
    this.state.set('mylist', (oldState) => update(oldState.mylist, item, 'id'));
  }
}
