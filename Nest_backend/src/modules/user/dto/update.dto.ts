import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
