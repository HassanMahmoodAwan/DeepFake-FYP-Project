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
}

export const FileSchema = SchemaFactory.createForClass(File);

@Schema({ timestamps: true })
export class Text extends Document {
  @Prop({ required: true })
  content: string;
}

export const TextSchema = SchemaFactory.createForClass(Text);
