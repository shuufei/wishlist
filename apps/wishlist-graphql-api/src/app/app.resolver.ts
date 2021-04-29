import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  Context,
  Info,
} from '@nestjs/graphql';
import { from, Observable } from 'rxjs';
import { CreateWishlistInput } from './models/create-wishlist-input';
import { UpdateWishlistInput } from './models/update-wishlist-input';
import { Wishlist } from './models/wishlist.model';
import { WishlistRepository } from './repository/wishlist.repository';
import { delay, mapTo, map } from 'rxjs/operators';
import { User } from './models/user.model';
import { Headers, UseGuards } from '@nestjs/common';
import { RolesGuard } from './roles.guard';

@Resolver(() => Wishlist)
export class AppResolver {
  constructor(private wishlistRepository: WishlistRepository) {}

  @UseGuards(RolesGuard)
  @Query(() => [Wishlist])
  wishlist(@Context() context: any): Observable<Wishlist[]> {
    const _context = {
      ...context,
      req: {
        ...context.req,
        socket: undefined,
        client: undefined,
        connection: undefined,
        res: undefined,
      },
    };
    console.log('context: ', JSON.stringify(_context));
    const req = this.wishlistRepository.list();
    return from(req);
  }

  @Query(() => Wishlist)
  getWishlist(@Args('id', { type: () => ID }) id: string): Wishlist {
    console.log('--- wishlist id: ', id);
    return {
      id,
      title: 'get wishlist title',
      description: 'get wishlist description',
    };
  }

  @Mutation(() => Wishlist)
  create(@Args('params') params: CreateWishlistInput): Observable<Wishlist> {
    const req = this.wishlistRepository.create(params);
    return from(req).pipe(delay(1000));
  }

  @Mutation(() => Wishlist)
  update(
    @Args('id', { type: () => ID }) id: string,
    @Args('params') params: UpdateWishlistInput
  ): Observable<Wishlist> {
    const req = this.wishlistRepository.update(id, params);
    return from(req).pipe(delay(1000));
  }

  @Mutation(() => Wishlist)
  delete(@Args('id', { type: () => ID }) id: string): Observable<Wishlist> {
    const req = this.wishlistRepository.delete(id);
    return from(req).pipe(
      delay(1000),
      mapTo({ id, title: '', description: '' })
    );
  }

  @Query(() => [User])
  users(): Observable<User[]> {
    const req = this.wishlistRepository.list();
    return from(req).pipe(
      map((wishlist) => {
        return [
          {
            // id: `${new Date().valueOf()}${Math.floor(Math.random() * 100)}`,
            id: '161683081231618',
            title: 'tarou',
            items: wishlist,
          },
        ];
      })
    );
  }
}
