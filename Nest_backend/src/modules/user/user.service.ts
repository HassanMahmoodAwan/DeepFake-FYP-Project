import {
  ConflictException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto, UserSearchDTO } from './dto/index.dto';
import { Http500 } from 'src/utils/Http500';
// import { User, UserStatus } from './schema/user.schema';
import { User } from './schema/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  /*****************************************************************************************************************
   Create User
   *****************************************************************************************************************/

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      let { password, ...rest } = createUserDto;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      let userDto = { password: hashedPassword, ...rest };
      const newUser = new this.userModel(userDto);
      const user = await newUser.save();
      // console.log(user); // talha add

      // To remove password from the response and findone function remove the password
      return await this.findOne(user._id);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User with this email already exists');
      } else {
        Http500.throw(error);
      }
    }
  }

  /*****************************************************************************************************************
   Find All Users
   *****************************************************************************************************************/

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find().select('-password').exec();
    } catch (error) {
      throw new NotFoundException('No users found');
    }
  }

  /*****************************************************************************************************************
   Find One User
   *****************************************************************************************************************/

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id).select('-password').exec();

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.userModel.findOne({ email }).select('-password').exec();
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  /*****************************************************************************************************************
   Update User
   *****************************************************************************************************************/

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      await this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
      return await this.findOne(id);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User with this email already exists');
      } else {
        Http500.throw(error);
      }
    }
  }

  /*****************************************************************************************************************
   Delete User
   *****************************************************************************************************************/

  async remove(id: string): Promise<User> {
    try {
      return await this.userModel.findByIdAndDelete(id);
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  /*****************************************************************************************************************
   Authenticate User
   *****************************************************************************************************************/

  async validateEmailAndPassword(
    email: string,
    password: string,
  ): Promise<any> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      if (!user) {
        throw new NotFoundException('User not found with email');
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log(passwordMatch);
      if (!passwordMatch) {
        throw new Error('Invalid password');
      }

      // if (user && user.status === UserStatus.ACTIVE) {
      if (user) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async searchUser(searchParams: UserSearchDTO): Promise<User[]> {
    // Performing the query using Mongoose
    // console.log("searchParams IN service", searchParams);
    const query = {};

    if (searchParams.name) {
      query['name'] = new RegExp(searchParams.name, 'i');
    }

    if (searchParams.email) {
      query['email'] = new RegExp(searchParams.email, 'i');
    }

    return this.userModel.find(query).select('-password').exec();
  }

  /*****************************************************************************************************************
   END OF LINES
   *****************************************************************************************************************/
}
