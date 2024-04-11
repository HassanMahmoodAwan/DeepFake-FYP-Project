import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpRequest } from './dtos/auth.dto';
import { UserService } from 'src/modules/user/user.service';
import { log } from 'console';

interface UserDTO {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.validateEmailAndPassword(
      email,
      password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }
    return user;
  }

  async signIn(user: UserDTO) {
    const userData = await this.validateUser(user.email, user.password);
    // console.log(userData);
    // console.log('000000000000000000000000000000');

    if (userData) {
      let { _id, name, email } = userData._doc;
      const payload = {
        id: _id.toHexString(), // Make sure this is the user's ID from the database
        name: name,
        email: email,
      };
      const token = this.jwtService.sign(payload);
      return {
        token, // This will include the payload in the JWT
      };
    }
    throw new UnauthorizedException('Invalid credentials.');
  }

  async signUp(data: SignUpRequest) {
    return await this.usersService.create(data);
  }

  async profile(userId: string) {
    return await this.usersService.findOne(userId);
  }

  // Refresh token logic would go here
}
