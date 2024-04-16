import { Controller, Get, Post, Body } from '@nestjs/common';
import { TTSService } from './tts.services';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ttsDto } from './dto/tts.dto';
import { Public } from '../../auth/decorators/setmetadata.decorator';
@ApiBearerAuth()
@ApiTags('TTS')
@Controller('tts')
export class TTSController {
  constructor(private readonly ttsService: TTSService) {}

  @ApiOkResponse({
    description: 'successfully input taken',
  })
  @Public()
  @Post('output')
  create(@Body() ttDto: ttsDto) {
    return this.ttsService.input(ttDto);
  }

  @Public()
  @Post('hi')
  async hi() {
    return 'hi';
  }
}
