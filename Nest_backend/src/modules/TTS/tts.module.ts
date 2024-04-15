import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TTS, TTSSchema } from './schema/tts.schema';
import { TTSController } from './tts.controller';
import { TTSService } from './tts.services';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: TTS.name, schema: TTSSchema }])],
  controllers: [TTSController],
  providers: [TTSService],
  exports: [TTSService],
})
export class TSModule {}
