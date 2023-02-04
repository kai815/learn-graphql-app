import { Module } from '@nestjs/common';
import {PhotosResolver} from "./photo.resolver";
import {PhotoService} from "./photo.service";

@Module({
  providers:[PhotosResolver,PhotoService]
})
export class PhotosModule {}
