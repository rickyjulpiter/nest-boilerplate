import { Test } from '@nestjs/testing';

import { OtpModule } from './otp.module';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { UsersModule } from '../users/users.module';

describe('OtpModule', () => {
  let otpModule: OtpModule;
  let otpService: OtpService;
  let otpController: OtpController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule, OtpModule],
    }).compile();

    otpModule = moduleRef.get<OtpModule>(OtpModule);
    otpService = moduleRef.get<OtpService>(OtpService);
    otpController = moduleRef.get<OtpController>(OtpController);
  });

  it('should be defined', () => {
    expect(otpModule).toBeDefined();
  });

  it('should provide OtpService', () => {
    expect(otpService).toBeInstanceOf(OtpService);
  });

  it('should provide OtpController', () => {
    expect(otpController).toBeInstanceOf(OtpController);
  });
});
