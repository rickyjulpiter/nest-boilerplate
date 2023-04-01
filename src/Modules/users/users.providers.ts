import { USER_REPOSITORY } from '../../Helpers/Constants';
import { Users } from './users.entity';

export const usersProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: Users,
  },
];
