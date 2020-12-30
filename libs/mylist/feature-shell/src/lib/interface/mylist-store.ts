import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { WishlistItem as _WishlistItem } from '@wishlist/shared/domain';

@Injectable({ providedIn: 'root' })
export abstract class MylistStore {
  list$: () => Observable<WishlistItem[]>;
  get$: (id: WishlistItem['id']) => Observable<WishlistItem>;
  set: (items: WishlistItem[]) => void;
  add: (item: WishlistItem) => void;
  remove: (id: WishlistItem['id']) => void;
  update: (item: WishlistItem) => void;
}

export class WishlistItem extends _WishlistItem {}
