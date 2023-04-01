import { Inject, Injectable, Logger } from '@nestjs/common';
import { generate } from 'otp-generator';
import * as moment from 'moment';

import { OTP_REPOSITORY } from '../../Helpers/Constants';
import { Otp } from './otp.entity';
import Helpers from '../../Helpers/helpers';

@Injectable()
export class OtpService {
  private helpers: Helpers;
  private readonly logger = new Logger();
  constructor(
    @Inject(OTP_REPOSITORY) private readonly otpRepository: typeof Otp,
  ) {
    this.helpers = new Helpers();
  }

  async create(email: string, otp: string, expiredAt: moment.Moment) {
    return await this.otpRepository.create({ email, otp, expiredAt });
  }

  async update(email: string) {
    try {
      return await this.otpRepository.update(
        { status: 0 },
        { where: { email } },
      );
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findOne(email: string, otp: string) {
    return await this.otpRepository.findOne({
      where: { otp, email, status: 1 },
      order: [['createdAt', 'DESC']],
    });
  }

  async sendOTPEmail(email: string) {
    const expiredAt = moment().add(10, 'minutes');
    const otp = await generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    await this.update(email);
    await this.create(email, otp, expiredAt);

    await this.helpers.sendEmail(email, otp);
  }
}
