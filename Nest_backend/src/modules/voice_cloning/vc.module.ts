import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { vcController } from './vc.controller';
import { File, FileSchema, TextSchema, Text } from './schema/file.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { vcService } from './vc.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
    MongooseModule.forFeature([{ name: Text.name, schema: TextSchema }]),
    MulterModule.register({
      dest: './uploads', // Destination folder for uploaded files
    }),
  ],
  controllers: [vcController],
  providers: [vcService],
})
export class vcModule {}
