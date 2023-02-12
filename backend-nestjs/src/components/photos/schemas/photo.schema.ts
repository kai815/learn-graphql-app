import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PhotoDocument = HydratedDocument<Photo>;

@Schema()
export class Photo {
  @Prop()
  name: string;

  @Prop()
  category: number;

  @Prop()
  description: string;

  @Prop()
  userId:string;

  @Prop()
  created:string
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);
