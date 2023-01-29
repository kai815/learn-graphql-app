import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PhotoModel {
  @Field((type) => String)
  id: string;

  @Field((type) => String)
  url: string;

  @Field((type) => String)
  name: string;

  @Field((type) => String,{ nullable: true })
  description?: string;
}