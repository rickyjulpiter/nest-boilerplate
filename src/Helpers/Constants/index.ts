import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

export const USER_REPOSITORY = 'USERS_REPOSITORY';
export const OTP_REPOSITORY = 'OTP_REPOSITORY';

export const JWT_CONSTANTS = {
  secret: process.env.JWT_KEY,
  expiresIn: process.env.JWT_TOKEN_EXPIRATION,
};

export const SEQUELIZE = 'SEQUELIZE';
export const DEVELOPMENT = 'development';
export const TEST = 'test';
export const PRODUCTION = 'production';
