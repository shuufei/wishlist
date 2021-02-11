import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateWishlistInput {
  @Field()
  title: string;

  @Field()
  description: string;
}
