import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './schema/user.schema';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateUserDto,
  UserSearchDTO,
  UserResponse,
  UpdateUserDto,
} from './dto/index.dto';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /*****************************************************************************************************************
   Create User
   *****************************************************************************************************************/

  @ApiOkResponse({
    type: UserResponse,
    description: 'User Created Successfully',
  })
  @ApiInternalServerErrorResponse({
    description: 'Some Unknown Error Occurred',
  })
  @ApiOperation({ description: 'Create New User' })
  @ApiConflictResponse({
    description: 'User with this email already exists',
  })
  @Post('add')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /*****************************************************************************************************************
   Find All Users
   *****************************************************************************************************************/

  @ApiOkResponse({
    type: [UserResponse],
    description: 'Users Found Successfully',
  })
  @ApiInternalServerErrorResponse({
    description: 'Some Unknown Error Occurred',
  })
  @ApiOperation({ description: 'Get All Users' })
  @ApiNotFoundResponse({
    description: 'Users Not Found',
  })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  /*****************************************************************************************************************
   Find One User
   *****************************************************************************************************************/

  @ApiOkResponse({
    type: UserResponse,
    description: 'User Found Successfully',
  })
  @ApiInternalServerErrorResponse({
    description: 'Some Unknown Error Occurred',
  })
  @ApiOperation({ description: 'Get Specific User' })
  @ApiNotFoundResponse({
    description: 'User Not Found',
  })
  @Get('single')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Request() req) {
    const { id } = req.user;
    return this.userService.findOne(id);
  }

  /*****************************************************************************************************************
   Update User
   *****************************************************************************************************************/

  @ApiOkResponse({
    type: UserResponse,
    description: 'User Updated Successfully',
  })
  @ApiInternalServerErrorResponse({
    description: 'Some Unknown Error Occurred',
  })
  @ApiOperation({ description: 'Update User' })
  @ApiConflictResponse({
    description: 'User with this email already exists',
  })
  @UseGuards(AuthGuard('jwt'))
  @Patch('update')
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const { id } = req.user;
    return this.userService.update(id, updateUserDto);
  }

  /**********user *******************************************************************************************************
   Delete User
   *****************************************************************************************************************/

  @ApiOkResponse({
    type: UserResponse,
    description: 'User Deleted Successfully',
  })
  @ApiInternalServerErrorResponse({
    description: 'Some Unknown Error Occurred',
  })
  @ApiOperation({ description: 'Delete User' })
  @ApiNotFoundResponse({
    description: 'User Not Found',
  })
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete')
  remove(@Request() req) {
    const { id } = req.user;
    return this.userService.remove(id);
  }

  /*****************************************************************************************************************
   Powerfull API For Searching
   *****************************************************************************************************************/
  @ApiOkResponse({
    type: UserResponse,
    description: 'User Created Successfully',
  })
  @ApiInternalServerErrorResponse({
    description: 'Some Unknown Error Occurred',
  })
  @ApiOperation({ description: 'Create New User' })
  @ApiConflictResponse({
    description: 'User with this email already exists',
  })
  @ApiBody({ type: UserSearchDTO, description: 'Search Parameters' })
  @Post('/search')
  async searchUser(@Body() searchParams: any): Promise<User[]> {
    console.log('searchParams IN Controller', searchParams);
    return this.userService.searchUser(searchParams);
  }

  /*****************************************************************************************************************
   END OF LINES
   *****************************************************************************************************************/
}
