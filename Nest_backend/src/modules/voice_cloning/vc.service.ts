import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File } from './schema/file.schema';
import Replicate from 'replicate';
import { readFile } from 'fs/promises';

@Injectable()
export class vcService {
  private uploadedFile: any;
  private option: any;
  private replicate: Replicate;

  constructor(
    @InjectModel(File.name)
    private readonly fileModel: Model<File>,
    replicate = new Replicate({
      auth: 'r8_06l6hwas5tCLkIEaTteQsVhantyhuU90rYoZo',
    }),
  ) {}
  async uploadAFile(file: File): Promise<File> {
    const newFile = new this.fileModel({
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      destination: file.destination,
      path: file.path,
      size: file.size,
    });

    const savedFile = await newFile.save();
    return savedFile;
  }

  async processUpload(body: any) {
    try {
      const data: string = (
        await readFile(`../../uploads/${this.uploadedFile.name}`)
      ).toString('base64');
      const image = `data:application/octet-stream;base64,${data}`;

      let input;
      if (this.option == 'Wajahat') {
        input = {
          rvc_model: 'CUSTOM',
          custom_rvc_model_download_url:
            'https://replicate.delivery/pbxt/eDqhKrXNU7UxESSEve5MJTtyFr2wFeReNUfKY1mSycmqP87UC/wajahat_qazi.zip',
          song_input: image,
          main_vocals_volume_change: 10,
        };
      } else {
        input = {
          rvc_model: this.option,
          song_input: image,
          main_vocals_volume_change: 10,
        };
      }

      console.log('Input Provided, Wait Now');

      const output = await this.replicate.run(
        'zsxkib/realistic-voice-cloning:0a9c7c558af4c0f20667c1bd1260ce32a2879944a0b9e44e1398660c077b1550',
        { input },
      );

      console.log('Output Generated: ');
      console.log(output);

      // Reset uploadedFile and option after processing
      this.uploadedFile = undefined;
      this.option = undefined;

      return output;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
