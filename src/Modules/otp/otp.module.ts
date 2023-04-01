import { Module } from '@nestjs/common';

import { OtpService } from './otp.service';
import { otpProviders } from './otp.providers';
import { OtpController } from './otp.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [OtpService, ...otpProviders],
  controllers: [OtpController],
  exports: [OtpService],
})
export class OtpModule {}
