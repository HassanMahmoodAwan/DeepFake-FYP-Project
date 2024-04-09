import {
  Body,
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
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
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { vcService } from './vc.service';
import { readFile } from 'fs/promises';

@Controller('file')
export class vcController {
  constructor(private readonly vcService: vcService) {}
  @ApiOkResponse({
    description: 'file Uplaoded Successfully',
  })
  @ApiInternalServerErrorResponse({
    description: 'Some Unknown Error Occurred',
  })
  @ApiOperation({ description: 'Create New User' })
  @ApiConflictResponse({
    description: 'User with this email already exists',
  })
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Destination folder for uploaded files
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file): Promise<any> {
    console.log('Uploaded file:', file);
    return this.vcService.uploadAFile(file);
  }

  @ApiTags('option')
  @ApiOkResponse({
    description: 'file Uplaoded Successfully',
  })
  @ApiInternalServerErrorResponse({
    description: 'Some Unknown Error Occurred',
  })
  @Post('option')
  receiveOption(@Body() option: any): string {
    console.log(option);
    return 'Option received by backend';
  }

  @Get('upload')
  async processUpload(@Body() body: any): Promise<any> {
    console.log('check');
    return this.vcService.processUpload(body);
  }
}
