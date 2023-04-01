import { OTP_REPOSITORY } from '../../Helpers/Constants';
import { Otp } from './otp.entity';

export const otpProviders = [
  {
    provide: OTP_REPOSITORY,
    useValue: Otp,
  },
];
