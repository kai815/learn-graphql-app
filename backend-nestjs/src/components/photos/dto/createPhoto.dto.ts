import { Field, InputType } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js'
import { PhotoCategory } from "@/components/photos/interfaces/photo.model";
import { Stream } from 'stream';

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

@InputType()
export class CreatePhotoDto {
  @Field((type) => String)
  url: string;

  @Field((type) => String)
  name: string;

  @Field((type) => PhotoCategory)
  category: PhotoCategory;

  @Field((type) => String,{ nullable: true })
  description?: string;

  @Field(() => GraphQLUpload)
  image: Promise<FileUpload>;
}
