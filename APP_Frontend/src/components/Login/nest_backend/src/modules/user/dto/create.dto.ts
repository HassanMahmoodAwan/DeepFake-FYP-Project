import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, IsEnum } from 'class-validator';
// import { UserStatus, UserRole } from '../schema/user.schema';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @Length(4)
  password: string;

  // @ApiProperty({
  //   enum: UserStatus,
  //   default: UserStatus.ACTIVE,
  //   required: true,
  // })
  // @IsEnum(UserStatus, {
  //   message: 'Status must be ' + Object.values(UserStatus).join(', '),
  // })
  // status: UserStatus;

  // @ApiProperty({
  //   enum: UserRole,
  //   default: UserRole.CLIENT,
  //   required: true,
  // })
  // @IsEnum(UserRole, {
  //   message: 'Role must be ' + Object.values(UserRole).join(', '),
  // })
  // role: UserRole;
}
