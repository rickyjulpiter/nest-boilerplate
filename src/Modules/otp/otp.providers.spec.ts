import { OTP_REPOSITORY } from '../../Helpers/Constants';
import { Otp } from './otp.entity';
import { otpProviders } from './otp.providers';

describe('OTP Providers', () => {
  it('should contain the correct provider', () => {
    const expectedProvider = {
      provide: OTP_REPOSITORY,
      useValue: Otp,
    };

    const provider = otpProviders.find((p) => p.provide === OTP_REPOSITORY);

    expect(provider).toEqual(expectedProvider);
  });
});
