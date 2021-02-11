import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'apps/wishlist-graphql-api/src/schema.gql',
    }),
  ],
  controllers: [],
  providers: [AppResolver],
})
export class AppModule {}
