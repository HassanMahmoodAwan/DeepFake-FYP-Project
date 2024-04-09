import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { vcController } from './vc.controller';
import { File, FileSchema } from './schema/file.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { vcService } from './vc.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
    MulterModule.register({
      dest: './uploads', // Destination folder for uploaded files
    }),
  ],
  controllers: [vcController],
  providers: [vcService],
})
export class vcModule {}
