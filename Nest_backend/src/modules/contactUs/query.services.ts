import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Query } from './schema/query.schema';
import { queryDto } from './dto/query.dto';

@Injectable()
export class QueryService {
  constructor(
    @InjectModel(Query.name)
    private readonly queryModel: Model<Query>,
  ) {}
  async creatQuery(query: queryDto): Promise<Query> {
    const save = new this.queryModel(query);
    return save.save();
  }
}
