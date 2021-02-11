import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Observable, of } from 'rxjs';
import { CreateWishlistInput } from './models/create-wishlist-input';
import { Wishlist } from './models/wishlist.model';

@Resolver((of) => Wishlist)
export class AppResolver {
  @Query((returns) => [Wishlist])
  wishlist(): Observable<Wishlist[]> {
    return of([]);
  }

  @Mutation((returns) => Wishlist)
  create(@Args('params') params: CreateWishlistInput): Observable<Wishlist> {
    console.log('create params: ', params);
    return of({
      id: 99,
      title: params.title,
      description: params.description,
    });
  }

  @Mutation((returns) => Wishlist)
  update(@Args('id', { type: () => Int }) id: number): Observable<Wishlist> {
    return of({
      id,
      title: 'title',
      description: 'description',
    });
  }

  @Mutation((returns) => Int)
  delete(@Args('id', { type: () => Int }) id: number): Observable<number> {
    return of(id);
  }
}
