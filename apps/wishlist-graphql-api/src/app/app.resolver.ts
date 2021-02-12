import { Resolver, Query, Mutation, Args, Float } from '@nestjs/graphql';
import { from, Observable } from 'rxjs';
import { CreateWishlistInput } from './models/create-wishlist-input';
import { UpdateWishlistInput } from './models/update-wishlist-input';
import { Wishlist } from './models/wishlist.model';
import { WishlistRepository } from './repository/wishlist.repository';

@Resolver(() => Wishlist)
export class AppResolver {
  constructor(private wishlistRepository: WishlistRepository) {}

  @Query(() => [Wishlist])
  wishlist(): Observable<Wishlist[]> {
    const req = this.wishlistRepository.list();
    return from(req);
  }

  @Mutation(() => Wishlist)
  create(@Args('params') params: CreateWishlistInput): Observable<Wishlist> {
    const req = this.wishlistRepository.create(params);
    return from(req);
  }

  @Mutation(() => Wishlist)
  update(
    @Args('id', { type: () => Float }) id: number,
    @Args('params') params: UpdateWishlistInput
  ): Observable<Wishlist> {
    const req = this.wishlistRepository.update(id, params);
    return from(req);
  }

  @Mutation(() => Float)
  delete(@Args('id', { type: () => Float }) id: number): Observable<number> {
    const req = this.wishlistRepository.delete(id);
    return from(req);
  }
}
