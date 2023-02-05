import { Field, ObjectType,ID } from '@nestjs/graphql';
import {UserModel} from "@/components/users/interfaces/user.model";

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

  @Field((type)=>UserModel,{nullable:true})
  postedBy:UserModel
}