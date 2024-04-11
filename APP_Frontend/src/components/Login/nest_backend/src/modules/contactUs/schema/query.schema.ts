import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongo, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Query extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  query: string;
}

export const QuerySchema: any = SchemaFactory.createForClass(Query);
