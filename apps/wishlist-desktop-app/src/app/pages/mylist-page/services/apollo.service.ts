import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { tap } from 'rxjs/operators';
import { WishlistItem } from '../../../../../../wishlist-graphql-api/src/app/repository/wishlist.repository';
import { User } from '../../../../../../wishlist-graphql-api/src/app/models/user.model';
import { update } from '@rx-angular/state';
import { InMemoryCache } from '@apollo/client/core';

@Injectable({
  providedIn: 'root',
})
export class ApolloService {
  constructor(private apollo: Apollo) {}

  getUsers() {
    return this.apollo
      .watchQuery<{ users: User[] }>({
        query: gql`
          {
            users {
              id
              title
              items {
                id
                title
                description
              }
            }
          }
        `,
      })
      .valueChanges.pipe(
        tap((res) => console.log('--- watch query users res: ', res)),
        tap(() => {
          const res = this.apollo.client.readQuery({
            query: gql`
              query UsersQuery {
                users {
                  id
                  name
                  items {
                    id
                    title
                  }
                }
              }
            `,
          });
          console.log('--- read query res: ', res);
        })
      );
  }

  list() {
    return this.apollo
      .watchQuery<{ wishlist: WishlistItem[] }>({
        query: gql`
          {
            wishlist {
              id
              title
            }
          }
        `,
      })
      .valueChanges.pipe(
        tap((res) => console.log('--- watch query wishlist res: ', res))
      );
  }

  list2() {
    return this.apollo
      .watchQuery<{ wishlist: WishlistItem[] }>({
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
      .valueChanges.pipe(
        tap((res) => console.log('--- watch query 2 wishlist res: ', res))
      );
  }

  getWishlist(id: string) {
    return this.apollo.watchQuery<{ getWishlist: WishlistItem }>({
      query: gql`
        query GetWishlist($id: ID!) {
          getWishlist(id: $id) {
            id
            title
            description
          }
        }
      `,
      variables: {
        id,
      },
    }).valueChanges;
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
        update: (store, v) => {
          console.log('--- store: ', store, v);
          const data = store.readQuery<{ wishlist: WishlistItem[] }>({
            query: gql`
              query ReadWishlist {
                wishlist {
                  id
                  title
                  description
                }
              }
            `,
          });
          if (data == null) {
            return;
          }
          console.log('--- read query: ', data);
          const wishlist = [...data.wishlist, v.data?.create];
          store.writeQuery({
            query: gql`
              query WriteWishlist {
                wishlist {
                  id
                  title
                  description
                }
              }
            `,
            data: {
              wishlist,
            },
          });
        },
        optimisticResponse: {
          create: {
            id: 'aaaaa',
            ...body,
          },
        },
      })
      .pipe(tap((res) => console.log('--- mutate wishlist res: ', res)));
  }

  update(id: Id, body: Body) {
    return this.apollo
      .mutate<{
        update: WishlistItem;
      }>({
        mutation: gql`
          mutation Update($id: ID!, $title: String!, $description: String!) {
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
        optimisticResponse: {
          // updateオプションで自分で実装しないと楽観的更新できない
          update: {
            id,
            ...body,
          },
        },
      })
      .pipe(tap((res) => console.log('--- update wishlist res: ', res)));
  }

  delete(id: Id) {
    return this.apollo
      .mutate<{
        delete: WishlistItem;
      }>({
        mutation: gql`
          mutation Delete($id: ID!) {
            delete(id: $id) {
              id
            }
          }
        `,
        variables: {
          id,
        },
        update: (store, v) => {
          // store.gc();
          // store.evict({ id: v.data?.delete.id, fieldName: 'wishlist' });
          store.modify({
            fields: {
              wishlist(list, v) {
                console.log('---- modify: ', list, v);
                return list.filter(
                  (item: any) => v.readField('id', item) !== id
                );
              },
            },
          });
          // const data = store.readQuery<{ wishlist: WishlistItem[] }>({
          //   query: gql`
          //     query ReadWishlist {
          //       wishlist {
          //         id
          //         title
          //         description
          //       }
          //     }
          //   `,
          // });
          // if (data == null) {
          //   return;
          // }
          // const wishlist = data.wishlist.filter(
          //   (item) => item.id !== v.data?.delete.id
          // );
          // store.writeQuery({
          //   query: gql`
          //     query WriteWishlist {
          //       wishlist {
          //         id
          //         title
          //         description
          //       }
          //     }
          //   `,
          //   data: {
          //     wishlist,
          //   },
          // });
          // console.log('--- cache update complete!!');
        },
        optimisticResponse: {
          delete: {
            id: id,
            title: '',
            description: '',
          },
        },
      })
      .pipe(tap((v) => console.log('----- delete complete!!', v)));
  }
}

type Id = WishlistItem['id'];

type Body = Pick<WishlistItem, 'title' | 'description'>;
