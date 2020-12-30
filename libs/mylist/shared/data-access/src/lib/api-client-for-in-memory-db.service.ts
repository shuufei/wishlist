import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WishlistItemForDb } from './types';
import { map } from 'rxjs/operators';
import {
  MylistDataAccess,
  WishlistItemResponse,
} from '@wishlist/mylist/feature-shell';

@Injectable({
  providedIn: 'root',
})
export class ApiClientForInMemoryDbService implements MylistDataAccess {
  readonly baseUrl = 'api/mylist';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient
      .get<WishlistItemForDb[]>(this.baseUrl)
      .pipe(
        map((items) =>
          items.map(
            (v) => new WishlistItemResponse(v.id, v.title, v.description)
          )
        )
      );
  }

  get(id: Id) {
    return this.httpClient
      .get<WishlistItemForDb>(`${this.baseUrl}/${id}`)
      .pipe(
        map(
          (item) =>
            new WishlistItemResponse(item.id, item.title, item.description)
        )
      );
  }

  create(body: Body) {
    return this.httpClient
      .post<WishlistItemForDb>(this.baseUrl, body)
      .pipe(
        map(
          (item) =>
            new WishlistItemResponse(item.id, item.title, item.description)
        )
      );
  }

  update(id: Id, body: Body) {
    return this.httpClient
      .put<WishlistItemForDb>(`${this.baseUrl}/${id}`, body)
      .pipe(
        map(
          (item) =>
            new WishlistItemResponse(item.id, item.title, item.description)
        )
      );
  }

  delete(id: Id) {
    return this.httpClient
      .delete(`${this.baseUrl}/${id}`)
      .pipe(map(() => undefined));
  }
}

type Id = WishlistItemForDb['id'];

type Body = Pick<WishlistItemForDb, 'title' | 'description'>;
