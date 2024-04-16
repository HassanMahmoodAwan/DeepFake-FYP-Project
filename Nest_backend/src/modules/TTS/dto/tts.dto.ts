import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ttsDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  option: string;

  // @ApiProperty({ required: true })
  // @IsString()
  // @IsNotEmpty()
  // preset: string;
}
