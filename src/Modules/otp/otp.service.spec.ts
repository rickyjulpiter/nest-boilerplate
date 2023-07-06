import { Test } from '@nestjs/testing';
import * as moment from 'moment';

import { OtpService } from './otp.service';
import { OTP_REPOSITORY } from '../../Helpers/Constants';
import { Otp } from './otp.entity';
import Helpers from '../../Helpers/helpers';

describe('OtpService', () => {
  let otpService: OtpService;
  let otpRepositoryMock: Partial<typeof Otp>;
  let helpersMock: Partial<Helpers>;

  beforeEach(async () => {
    otpRepositoryMock = {
      create: jest.fn(),
      update: jest.fn().mockResolvedValue([1, [{}]]),
      findOne: jest.fn(),
    };

    helpersMock = {
      sendEmail: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        OtpService,
        {
          provide: OTP_REPOSITORY,
          useValue: otpRepositoryMock,
        },
        {
          provide: Helpers,
          useValue: helpersMock,
        },
      ],
    }).compile();

    otpService = moduleRef.get<OtpService>(OtpService);
  });

  describe('create', () => {
    it('should create an OTP record', async () => {
      const email = 'test@example.com';
      const otp = '123456';
      const expiredAt = moment().add(10, 'minutes');

      await otpService.create(email, otp, expiredAt);

      expect(otpRepositoryMock.create).toHaveBeenCalledWith({
        email,
        otp,
        expiredAt,
      });
    });
  });

  describe('update', () => {
    it('should update OTP records for the given email', async () => {
      const email = 'test@example.com';

      await otpService.update(email);

      expect(otpRepositoryMock.update).toHaveBeenCalledWith(
        { status: 0 },
        { where: { email } },
      );
    });
  });

  describe('findOne', () => {
    it('should find an OTP record with the given email and otp', async () => {
      const email = 'test@example.com';
      const otp = '123456';

      await otpService.findOne(email, otp);

      expect(otpRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { otp, email, status: 1 },
        order: [['createdAt', 'DESC']],
      });
    });
  });

  describe('sendOTPEmail', () => {
    it('should send otp to email', async () => {
      const user = { email: 'test@example.com', fullName: 'John Doe' };
      await otpService.sendOTPEmail(user.email);

      expect(otpRepositoryMock.update).toHaveBeenCalledWith(
        { status: 0 },
        { where: { email: user.email } },
      );
      expect(otpRepositoryMock.create).toHaveBeenCalledTimes(1);
      const createParams = (otpRepositoryMock.create as jest.Mock).mock
        .calls[0][0];
      expect(createParams.email).toBe(user.email);
      expect(createParams.otp).toBeDefined();
      expect(createParams.expiredAt).toBeDefined();
      expect(moment.isMoment(createParams.expiredAt)).toBe(true);
    });
  });
});
