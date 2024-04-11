import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class fileDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  file: Express.Multer.File;
}
