import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { QueryService } from './query.services';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { QuerySchema } from './schema/query.schema';
import { AuthGuard } from '@nestjs/passport';
import { queryDto } from './dto/query.dto';

@ApiBearerAuth()
@ApiTags('Query')
@Controller('query')
export class QueryControlle {
  constructor(private readonly queryService: QueryService) {}

  @Post('send')
  async sendQuery(@Body() query: queryDto): Promise<String> {
    const output: any = this.queryService.creatQuery(query);

    return output;
  }
}
