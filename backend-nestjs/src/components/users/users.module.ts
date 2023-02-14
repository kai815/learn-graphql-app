import { Module } from '@nestjs/common';
import {UsersResolver} from "./user.resolver";
import {UserService} from "./user.service";
import {PhotoService} from "@/components/photos/photo.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Photo, PhotoSchema} from "@/components/photos/schemas/photo.schema";
import {User, UserSchema} from "@/components/users/schemas/user.schema";
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature(
    [
      { name: Photo.name, schema: PhotoSchema },//userがphotoseriviceを使うに当たり、db接続のmoduleを提供しないといけないので
      { name:User.name, schema: UserSchema }
    ]
  )],
  providers:[UsersResolver,UserService,PhotoService]
})
export class UsersModule {}
