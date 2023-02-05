import { Field, ObjectType,ID } from '@nestjs/graphql';

@ObjectType()
export class PhotoModel {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  url: string;

  @Field((type) => String)
  name: string;

  @Field((type) => String,{ nullable: true })
  description?: string;
}