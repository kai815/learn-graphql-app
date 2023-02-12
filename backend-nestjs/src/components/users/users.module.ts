import { Module } from '@nestjs/common';
import {UsersResolver} from "./user.resolver";
import {UserService} from "./user.service";
import {PhotoService} from "@/components/photos/photo.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Photo, PhotoSchema} from "@/components/photos/schemas/photo.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Photo.name, schema: PhotoSchema }])], //userがphotoseriviceを使うに当たり、db接続のmoduleを提供しないといけないので
  providers:[UsersResolver,UserService,PhotoService]
})
export class UsersModule {}
