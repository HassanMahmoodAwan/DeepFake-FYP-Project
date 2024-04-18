import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File } from './schema/file.schema';
import { Text } from './schema/file.schema';
import { TextDto } from './dto/file.dto';
const Replicate = require('replicate');
import { readFile } from 'fs/promises';

@Injectable()
export class vcService {
  private replicate;

  constructor(
    @InjectModel(File.name)
    private readonly fileModel: Model<File>,
    @InjectModel(Text.name)
    private readonly textModel: Model<Text>,
  ) {
    this.replicate = new Replicate({
      auth: 'r8_06l6hwas5tCLkIEaTteQsVhantyhuU90rYoZo',
    });
  }

  async uploadFileAndText(
    file: Express.Multer.File,
    textDto: TextDto,
  ): Promise<any> {
    try {
      // Save the file
      const newFile = new this.fileModel({
        filename: file.filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        destination: file.destination,
        path: file.path,
        size: file.size,
      });
      const savedFile = await newFile.save();

      // Save the text
      const newText = new this.textModel({
        content: textDto.option,
        fileId: savedFile._id,
      });
      const savedText = await newText.save();

      // Perform Replicate operation
      const output = await this.runReplicate(
        savedFile.originalname,
        textDto.option,
      );

      return { file: savedFile, text: savedText, output };
    } catch (error) {
      console.error('Error while uploading file and text:', error);
      throw new Error('Error while uploading file and text.');
    }
  }

  async runReplicate(filename: string, option: string): Promise<any> {
    
    const data = await readFile(`./uploads/${filename}`);
    const base64Data = data.toString('base64');
    const image = `data:application/octet-stream;base64,${base64Data}`;
    try {
      let input;
      switch (option) {
        case 'Wajahat':
          input = {
            rvc_model: 'CUSTOM',
            custom_rvc_model_download_url:
              'https://replicate.delivery/pbxt/eDqhKrXNU7UxESSEve5MJTtyFr2wFeReNUfKY1mSycmqP87UC/wajahat_qazi.zip',
            song_input: image,
            main_vocals_volume_change: 10,
          };
          break;

        case 'Talha':
          input = {
            rvc_model: 'CUSTOM',
            custom_rvc_model_download_url:
              // 'https://replicate.delivery/pbxt/YyUdeoFLwFQFLKjfO1QJokWM40EznTaJgGB2AUDnleb9XGUlA/imran_niazi.zip',
              'https://replicate.delivery/pbxt/th8nPe0sP700PyTFZlepuioHgmSlFcKGhLoY8tSVkLuGMeVlA/muhammad_talha.zip',
            song_input: image,
            main_vocals_volume_change: 10,
          };
          break;

        default:
          input = {
            rvc_model: option,
            song_input: image,
            main_vocals_volume_change: 10,
          };
          break;
      }
      console.log('Input Provided, Wait Now');

      const output = await this.replicate.run(
        'zsxkib/realistic-voice-cloning:0a9c7c558af4c0f20667c1bd1260ce32a2879944a0b9e44e1398660c077b1550',
        { input },
      );
      // console.log('Output Generated: ');
      // console.log(output);

      filename = undefined;
      option = undefined;

      return output;
    } catch (error) {
      console.error('Error while running Replicate:', error);
      throw new Error('Error while running Replicate.');
    }
  }
}
