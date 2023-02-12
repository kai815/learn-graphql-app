import { Field, ObjectType } from '@nestjs/graphql';
import {UserModel} from "@/components/users/interfaces/user.model";

@ObjectType()
export class AuthModel {
  @Field((type) => String)
  token: String

  @Field((type)=>UserModel)
  user:UserModel
}
