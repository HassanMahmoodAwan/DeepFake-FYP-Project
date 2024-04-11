import {  Global, Module } from '@nestjs/common';
import { QueryService } from './query.services';
import { MongooseModule } from '@nestjs/mongoose';
import { QueryControlle } from './query.controller';
import { QuerySchema , Query} from './schema/query.schema';


@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Query.name, schema: QuerySchema }]),
  ],
  controllers: [QueryControlle],
  providers: [QueryService],
  exports: [QueryService],
})
export class QueryModule {}
