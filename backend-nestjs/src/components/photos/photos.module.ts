import { Module } from '@nestjs/common';
import {PhotosResolver} from "./photo.resolver";
import {PhotoService} from "./photo.service";
import {UserService} from "@/components/users/user.service";
import {Photo,PhotoSchema} from "@/components/photos/schemas/photo.schema";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forFeature([{ name: Photo.name, schema: PhotoSchema }])],
  providers:[PhotosResolver,PhotoService,UserService]
})
export class PhotosModule {}
