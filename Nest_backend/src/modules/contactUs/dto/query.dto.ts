import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, IsEnum } from 'class-validator';
// import { UserStatus, UserRole } from '../schema/user.schema';

export class queryDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  query: string;



 
}
