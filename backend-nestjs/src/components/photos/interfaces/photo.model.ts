import { Field, ObjectType, ID, registerEnumType } from '@nestjs/graphql';
import {UserModel} from "@/components/users/interfaces/user.model";

export enum PhotoCategory {
  SELFIE,
  PORTRAIT,
  ACTION,
  LANDSCAPE,
  GRAPHIC,
}
registerEnumType(PhotoCategory,{
  name:'PhotoCategory',
})


@ObjectType()
export class PhotoModel {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  url: string;

  @Field((type) => String)
  name: string;

  @Field((type) => PhotoCategory)
  category: PhotoCategory;

  @Field((type) => String,{ nullable: true })
  description?: string;

  @Field((type)=>UserModel,{nullable:true})
  postedBy:UserModel

  // Dateにしたい気も
  @Field(()=>String)
  created:string
}