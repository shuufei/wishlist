import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';
import {
  WishlistRepository,
  MockWishlistRepository,
} from './repository/wishlist.repository';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'apps/wishlist-graphql-api/src/schema.gql',
      cors: {
        origin: '*',
        methods: '*',
        exposedHeaders: '*',
      },
    }),
  ],
  controllers: [],
  providers: [
    AppResolver,
    { provide: WishlistRepository, useClass: MockWishlistRepository },
  ],
})
export class AppModule {}
