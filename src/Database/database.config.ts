import * as dotenv from 'dotenv';

import { IDatabaseConfig } from './interfaces/database.config.interface';

dotenv.config();
const logging = process.env.DATABASE_LOGGING === 'true';
const dialect = process.env.DATABASE_DIALECT;

export const databaseConfig: IDatabaseConfig = {
  development: {
    username: process.env.DATABASE_DEVELOPMENT_USER,
    password: process.env.DATABASE_DEVELOPMENT_PASSWORD,
    database: process.env.DATABASE_DEVELOPMENT_NAME,
    host: process.env.DATABASE_DEVELOPMENT_HOST,
    port: process.env.DATABASE_DEVELOPMENT_PORT,
    dialect,
    dialectOptions: {
      bigNumberStrings: true,
    },
    logging,
  },
  test: {
    username: process.env.DATABASE_TEST_USER,
    password: process.env.DATABASE_TEST_PASSWORD,
    database: process.env.DATABASE_TEST_NAME,
    host: process.env.DATABASE_TEST_HOST,
    port: process.env.DATABASE_TEST_PORT,
    dialect,
    dialectOptions: {
      bigNumberStrings: true,
    },
    logging,
  },
  production: {
    username: process.env.DATABASE_PRODUCTION_USER,
    password: process.env.DATABASE_PRODUCTION_PASSWORD,
    database: process.env.DATABASE_PRODUCTION_NAME,
    host: process.env.DATABASE_PRODUCTION_HOST,
    port: process.env.DATABASE_PRODUCTION_PORT,
    dialect,
    dialectOptions: {
      bigNumberStrings: true,
    },
    logging,
  },
};
