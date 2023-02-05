import { Module } from '@nestjs/common';
import {PhotosResolver} from "./photo.resolver";
import {PhotoService} from "./photo.service";
import {UserService} from "@/components/users/user.service";

@Module({
  providers:[PhotosResolver,PhotoService,UserService]
})
export class PhotosModule {}
