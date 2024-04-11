import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '../middleware/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secretOrKeyProvider: () => process.env.JWT_SECRET,
      signOptions: { expiresIn: '7 days' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // these are the middleware which are working over the whole app
  exports: [AuthService],
})
export class AuthModule {}
