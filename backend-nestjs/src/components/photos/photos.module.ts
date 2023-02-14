import { Module } from '@nestjs/common';
import {PhotosResolver} from "./photo.resolver";
import {PhotoService} from "./photo.service";
import {UserService} from "@/components/users/user.service";
import {Photo,PhotoSchema} from "@/components/photos/schemas/photo.schema";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "@/components/users/schemas/user.schema";
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature(
    [
      { name: Photo.name, schema: PhotoSchema },
      { name:User.name, schema: UserSchema }
    ]
  )],
  providers:[PhotosResolver,PhotoService,UserService]
})
export class PhotosModule {}
