import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class TTS extends Document {
  @Prop()
  text: string;

  @Prop({ unique: false })
  option: string;

  // @Prop({ unique: false })
  // preset: string;
}

export const TTSSchema: any = SchemaFactory.createForClass(TTS);
