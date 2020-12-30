import { WishlistItem } from '@wishlist/shared/domain';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export abstract class MylistDataAccess {
  list: () => Observable<WishlistItemResponse[]>;
  get: (id: Id) => Observable<WishlistItemResponse>;
  create: (body: Body) => Observable<WishlistItemResponse>;
  update: (body: WishlistItem) => Observable<void>;
  delete: (id: Id) => Observable<void>;
}

type Id = WishlistItem['id'];
type Body = Pick<WishlistItem, 'title' | 'description'>;

export class WishlistItemResponse extends WishlistItem {}
