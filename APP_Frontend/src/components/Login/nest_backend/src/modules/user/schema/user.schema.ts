import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongo, { Document } from 'mongoose';

// export enum UserStatus {
//   ACTIVE = 'ACTIVE',
//   INACTIVE = 'INACTIVE',
// }

// export enum UserRole {
//   ADMIN = 'ADMIN',
//   CLIENT = 'CLIENT',
// }

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, minlength: 8 })
  password: string;

  // @Prop({ required: true, default: UserStatus.ACTIVE, enum: UserStatus })
  // status: string;

  // @Prop({ required: true, default: UserRole.CLIENT, enum: UserRole })
  // role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
