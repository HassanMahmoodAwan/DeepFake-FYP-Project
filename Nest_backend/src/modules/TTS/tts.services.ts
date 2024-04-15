import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TTS } from './schema/tts.schema';
import { ttsDto } from './dto/tts.dto';
const Replicate = require('replicate');

@Injectable()
export class TTSService {
  private replicate;

  constructor(
    @InjectModel(TTS.name)
    private readonly ttsModel: Model<TTS>,
  ) {
    this.replicate = new Replicate({
      auth: 'r8_06l6hwas5tCLkIEaTteQsVhantyhuU90rYoZo',
    });
  }

  async input(ttDto: ttsDto): Promise<TTS> {
    const { text, option, preset } = ttDto;
    const texts: string = text.toString();
    const options: string = option;
    const presets: string = preset;

    console.log('Option received');
    console.log(texts);
    console.log(options);
    console.log(presets);

    const input: any = new this.ttsModel(ttDto);
    const data = await input.save();

    if (options && texts && presets) {
      try {
        let image;
        if (options == 'Wajahat') {
          image =
            'https://replicate.delivery/pbxt/235fJealHPlzgEsX0mwWwJQFkUKeHQmOYNjO5dUSQYeOUoiKB/tmpugf8hnq9file_stereo%20%28Trump%20Ver%29.mp3';
        } else if (options == 'Trump') {
          image =
            'https://replicate.delivery/pbxt/235fJealHPlzgEsX0mwWwJQFkUKeHQmOYNjO5dUSQYeOUoiKB/tmpugf8hnq9file_stereo%20%28Trump%20Ver%29.mp3';
        } else if (options == 'Hassan') {
          image =
            'https://replicate.delivery/pbxt/235fJealHPlzgEsX0mwWwJQFkUKeHQmOYNjO5dUSQYeOUoiKB/tmpugf8hnq9file_stereo%20%28Trump%20Ver%29.mp3';
        }

        const input = {
          seed: 0,
          text: texts,
          preset: presets,
          voice_a: 'custom_voice',
          voice_b: 'disabled',
          voice_c: 'disabled',
          cvvp_amount: 0,
          custom_voice: image,
        };

        console.log('Input Provided, Wait Now');

        console.log(input);

        console.log(Replicate);

        const output = await this.replicate.run(
          'afiaka87/tortoise-tts:e9658de4b325863c4fcdc12d94bb7c9b54cbfe351b7ca1b36860008172b91c71',
          { input },
        );

        console.log('Output Generated: ');
        console.log(output);

        return output;
      } catch (error) {
        console.error(error);
        return;
      }
    } else {
      console.log('No Input Provided');
    }
    return data;
  }
}
