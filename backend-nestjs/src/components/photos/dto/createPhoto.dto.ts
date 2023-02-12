import { Field, InputType } from '@nestjs/graphql';
import { PhotoCategory } from "@/components/photos/interfaces/photo.model";

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
}
