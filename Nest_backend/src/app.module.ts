import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { vcModule } from './modules/voice_cloning/vc.module';
import { TSModule } from './modules/TTS/tts.module';
import { QueryModule } from './modules/contactUs/query.module';
// import { TextToSpeechModule } from './modules/Text-to-speech/tts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', `.env.${process.env.NODE_ENV}`],
    }),
    vcModule,
    TSModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    QueryModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
