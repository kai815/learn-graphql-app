import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PhotoDocument = HydratedDocument<Photo>;

@Schema()
export class Photo {
  @Prop()
  name: string;

  @Prop()
  category: number; //ここnumberにしないとenumとの整合性取れないので注意

  @Prop()
  url:string;

  @Prop()
  description: string;

  @Prop()
  userId:string;

  @Prop()
  created:string
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);

