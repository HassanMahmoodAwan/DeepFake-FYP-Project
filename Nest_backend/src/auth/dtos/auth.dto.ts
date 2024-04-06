import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { CreateUserDto } from 'src/modules/user/dto/index.dto';

export class SignInRequest {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class SignUpRequest extends CreateUserDto {}

export class AccessTokenResponse {
  @ApiProperty()
  @IsString()
  access_token: string;
}
