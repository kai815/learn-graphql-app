import { Module } from '@nestjs/common';
import {PhotosResolver} from "./photo.resolver";

@Module({
  providers:[PhotosResolver]
})
export class PhotosModule {}
