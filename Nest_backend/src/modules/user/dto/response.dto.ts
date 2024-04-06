import { ApiProperty } from '@nestjs/swagger';
// import { UserRole } from '../schema/user.schema';

export class UserResponse {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  // @ApiProperty()
  // status: string;

  // @ApiProperty()
  // role: UserRole;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
