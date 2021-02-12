import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateWishlistInput {
  @Field()
  title: string;

  @Field()
  description: string;
}
