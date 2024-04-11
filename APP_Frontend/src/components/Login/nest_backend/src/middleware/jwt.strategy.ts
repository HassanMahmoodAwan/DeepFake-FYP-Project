import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
      passReqToCallback: true, // If you need the request object in validate
    });
  }

  /**
   * The function validates a request by checking if the payload contains the required properties and
   * throws an UnauthorizedException if any of them are missing.
   * it attached the follwing info with to the requst of with req.user
   * @param {Request} req - The `req` parameter is of type `Request`, which represents the incoming
   * request object in an Express application. It contains information about the HTTP request made by
   * the client.
   * @param {any} payload - The `payload` parameter is an object that contains the data to be
   * validated. It should have properties `id`, `name`, and `email`.
   * @returns an object with properties `id`, `name`, and `email`.
   */
  async validate(req: Request, payload: any) {
    if (!payload || !payload.id || !payload.name || !payload.email) {
      throw new UnauthorizedException();
    }
    return { id: payload.id, name: payload.name, email: payload.email };
  }
}
