import { Field, ObjectType,ID } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field((type) => ID)
  githubLogin: string;

  @Field((type) => String)
  name: string;

  @Field((type) => String)
  avatar: string;
}