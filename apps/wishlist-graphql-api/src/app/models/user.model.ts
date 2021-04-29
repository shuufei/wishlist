import { Field, ObjectType, ID } from '@nestjs/graphql';
import { WishlistItem } from '@wishlist/shared/domain';
import { Wishlist } from './wishlist.model';

@ObjectType()
export class User {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly title: string;

  @Field(() => [Wishlist])
  readonly items: WishlistItem[];
}
