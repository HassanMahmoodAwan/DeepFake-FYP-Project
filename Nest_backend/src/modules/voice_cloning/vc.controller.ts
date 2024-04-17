import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '../../auth/decorators/setmetadata.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { vcService } from './vc.service';
import { FileDto, TextDto } from './dto/file.dto'; // Assuming you have a DTO for file and text content

@Controller('file')
@ApiTags('File')
export class vcController {
  constructor(private readonly vcService: vcService) {}

  @ApiOperation({ summary: 'Upload file and text' })
  @ApiOkResponse({ description: 'File and text uploaded successfully' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Public()
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async uploadFileAndText(
    @UploadedFile() file: Express.Multer.File,
    @Body() textDto: TextDto,
  ): Promise<any> {
    // console.log('Uploaded file:', file);
    // console.log('Text content:', textDto.option);
    return this.vcService.uploadFileAndText(file, textDto);
  }
}
