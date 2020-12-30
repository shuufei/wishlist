import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { WishlistItem } from '@wishlist/mylist/feature-shell';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const mylist: WishlistItem[] = [
      {
        id: 1,
        title: '黒い財布',
        description: 'シンプルな長財布',
      },
      {
        id: 2,
        title: '図書カード',
        description: '本の出費がやばいので図書カードは助かる',
      },
      {
        id: 3,
        title: 'お酒',
        description: 'ビールが好き',
      },
    ];
    return { mylist };
  }
}
