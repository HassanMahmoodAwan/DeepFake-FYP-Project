import { IsString } from 'class-validator';

export class LogTextDto {
  @IsString()
  text: string;
}
