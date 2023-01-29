import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PhotosModule } from './components/photos/photos.module';
import * as path from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.join(process.cwd(), "src/schema.gql"),
      // sortSchema: true, これするとabcd順?辞書順になる
    }),
    PhotosModule,
  ],
})
export class AppModule {}