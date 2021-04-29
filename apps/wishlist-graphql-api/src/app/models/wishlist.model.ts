import { ObjectType, Field, ID } from '@nestjs/graphql';
import { WishlistItem } from '@wishlist/shared/domain';

@ObjectType()
export class Wishlist implements WishlistItem {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly title: string;

  @Field()
  readonly description: string;
}
