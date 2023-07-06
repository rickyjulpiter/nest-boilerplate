import { Injectable, Inject } from '@nestjs/common';

import { Users } from './users.entity';
import { USER_REPOSITORY } from '../../Helpers/Constants';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof Users,
  ) {}

  async create(user: UserDto, password: string): Promise<Users> {
    return await this.userRepository.create<Users>({
      fullName: user.fullName,
      password,
      email: user.email,
      phone: user.phone,
      subscription: user.subscription,
      status: user.status,
    });
  }

  async updateStatus(email: string) {
    return await this.userRepository.update(
      { status: 1 },
      { where: { email } },
    );
  }

  async updateProfile(userId: string, user) {
    return await this.userRepository.update(
      {
        ...user,
      },
      { where: { id: userId } },
    );
  }

  async updatePassword(userId: string, password: string) {
    return await this.userRepository.update(
      { password },
      { where: { id: userId } },
    );
  }

  async findOneByEmail(email: string): Promise<Users> {
    return await this.userRepository.findOne<Users>({ where: { email } });
  }

  async findAll(): Promise<Users[]> {
    return await this.userRepository.findAll<Users>();
  }
}
