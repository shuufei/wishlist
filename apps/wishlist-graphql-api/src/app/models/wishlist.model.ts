import { ObjectType, Field, Int } from '@nestjs/graphql';
import { WishlistItem } from '@wishlist/shared/domain';

@ObjectType()
export class Wishlist implements WishlistItem {
  @Field((type) => Int)
  readonly id: number;

  @Field()
  readonly title: string;

  @Field()
  readonly description: string;
}
