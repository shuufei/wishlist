import { ObjectType, Field, Float } from '@nestjs/graphql';
import { WishlistItem } from '@wishlist/shared/domain';

@ObjectType()
export class Wishlist implements WishlistItem {
  @Field(() => Float)
  readonly id: number;

  @Field()
  readonly title: string;

  @Field()
  readonly description: string;
}
