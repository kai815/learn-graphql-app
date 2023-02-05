import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePhotoDto {
  @Field((type) => String)
  url: string;

  @Field((type) => String)
  name: string;

  @Field((type) => String,{ nullable: true })
  description?: string;
}
