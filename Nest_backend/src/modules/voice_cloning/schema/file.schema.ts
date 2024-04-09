import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class File extends Document {
  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  originalname: string;

  @Prop({ required: true })
  mimetype: string;

  @Prop({ required: true })
  destination: string;

  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  size: number;
} // or any other property you need to store, like URL or metadata

export const FileSchema = SchemaFactory.createForClass(File);
