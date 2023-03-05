import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PhotosModule } from './components/photos/photos.module';
import { UsersModule } from './components/users/users.module';
import { AuthModule } from './components/auth/auth.module';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from '../config/configuration';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      // こっちが推奨されているけど動いてない
      // subscriptions: {
      //   'graphql-ws': true
      // },
      autoSchemaFile: path.join(process.cwd(), "src/schema.gql"),
      // sortSchema: true, これするとabcd順?辞書順になる
      cors: {
        origin: ['http://localhost:5173','http://127.0.0.1:5173'],
        credentials: true,
      },
    }),
    PhotosModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(configuration().database.host)
  ],
})
export class AppModule {}
