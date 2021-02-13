import { Injectable } from '@angular/core';
import {
  MylistDataAccess,
  WishlistItem,
  WishlistItemResponse,
} from '@wishlist/mylist/feature-shell';
import { of } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { map, filter, mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService implements MylistDataAccess {
  constructor(private apollo: Apollo) {}

  list() {
    return this.apollo
      .query<{ wishlist: WishlistItem[] }>({
        query: gql`
          {
            wishlist {
              id
              title
              description
            }
          }
        `,
      })
      .pipe(
        map((v) => v.data?.wishlist),
        filter((v): v is WishlistItem[] => v != null),
        map((v) =>
          v.map(
            (item) =>
              new WishlistItemResponse(item.id, item.title, item.description)
          )
        )
      );
  }

  get(id: Id) {
    return of({
      id,
      title: '',
      description: '',
    });
  }

  create(body: Body) {
    return this.apollo
      .mutate<{
        create: WishlistItem;
      }>({
        mutation: gql`
          mutation Create($title: String!, $description: String!) {
            create(params: { title: $title, description: $description }) {
              id
              title
              description
            }
          }
        `,
        variables: {
          title: body.title,
          description: body.description,
        },
      })
      .pipe(
        map((v) => v.data?.create),
        filter((v): v is WishlistItem => v != null),
        map((v) => new WishlistItemResponse(v.id, v.title, v.description))
      );
  }

  update(id: Id, body: Body) {
    return this.apollo
      .mutate<{
        update: WishlistItem;
      }>({
        mutation: gql`
          mutation Update($id: Float!, $title: String!, $description: String!) {
            update(
              id: $id
              params: { title: $title, description: $description }
            ) {
              id
              title
              description
            }
          }
        `,
        variables: {
          id: id,
          title: body.title,
          description: body.description,
        },
      })
      .pipe(mapTo(undefined));
  }

  delete(id: Id) {
    return this.apollo
      .mutate<{
        delete: Id;
      }>({
        mutation: gql`
          mutation Delete($id: Float!) {
            delete(id: $id)
          }
        `,
        variables: {
          id,
        },
      })
      .pipe(mapTo(undefined));
  }
}

type Id = WishlistItem['id'];

type Body = Pick<WishlistItem, 'title' | 'description'>;
