import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  createMongooseOptions():
    | Promise<MongooseModuleOptions>
    | MongooseModuleOptions {
    return {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      uri: process.env.DATABASE_URL,
      // To automatically create index in the database like unique email address if we set unique: true in the schema
      autoIndex: true,
    };
  }
}
