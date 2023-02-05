import { Field, ObjectType,ID } from '@nestjs/graphql';
import {PhotoModel} from "@/components/photos/interfaces/photo.model";

@ObjectType()
export class UserModel {
  @Field((type) => ID)
  githubLogin: string;

  @Field((type) => String)
  name: string;

  @Field((type) => String)
  avatar: string;

  @Field((type)=>[PhotoModel],{nullable:true})
  postedPhotos:PhotoModel[]
}