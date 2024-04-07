import { ApiProperty } from '@nestjs/swagger';

//   This is used for the filteration based on the diferent params like
/* The UserSearchDTO class is a TypeScript class that represents a data transfer object for searching
users, with optional properties for _id, name, and email. */

export class UserSearchDTO {
  @ApiProperty({ description: 'The id of the user', required: false })
  _id?: string;
  @ApiProperty({ description: 'The name of the user', required: false })
  name?: string;
  @ApiProperty({ description: 'The email of the user', required: false })
  email?: string;
}
