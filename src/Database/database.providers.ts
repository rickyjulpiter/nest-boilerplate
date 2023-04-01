import { Sequelize } from 'sequelize-typescript';

import { Users } from '../Modules/users/users.entity';
import { Otp } from '../Modules/otp/otp.entity';

import { databaseConfig } from './database.config';
import { DEVELOPMENT, PRODUCTION, SEQUELIZE, TEST } from '../Helpers/Constants';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([Users, Otp]);
      await sequelize.sync({
        force: false,
      });
      return sequelize;
    },
  },
];
