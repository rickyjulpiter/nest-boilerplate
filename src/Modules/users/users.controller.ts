import { Body, Controller, Get, Param, Req } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import {
  ForbiddenException,
  HttpStatus,
  Logger,
  NotFoundException,
  Patch,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';

import { Users as UsersEntity } from './users.entity';
import { UsersService } from './users.service';
import Helpers from '../../Helpers/helpers';
import { UpdatePasswordDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  private readonly helpers = new Helpers();
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Get()
  @ApiOperation({
    summary: 'Get users detail on auth',
    description: '',
    tags: ['Users'],
  })
  async get(@Req() req, @Res() res) {
    const user = await this.usersService.findOneByEmail(req.user.email);
    return this.helpers.response(res, HttpStatus.OK, '', {
      id: user.id,
      fullName: user.fullName,
      phone: user.phone,
      email: user.email,
    });
  }

  @Get(':email')
  @ApiOperation({
    summary: 'Get user detail',
    description: '',
    tags: ['Users'],
  })
  async findOne(@Param('email') email: string): Promise<UsersEntity> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('This user doesnt exists');
    }

    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Patch()
  @ApiOperation({
    summary: 'Update user detail',
    description: '',
    tags: ['Users'],
  })
  async update(@Body() users, @Req() req, @Res() res) {
    await this.usersService.updateProfile(req.user.userId, users);

    return this.helpers.response(res, HttpStatus.OK, 'Profile updated');
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Patch('update-password')
  @ApiOperation({
    summary: 'Update user detail',
    description: '',
    tags: ['Users'],
  })
  async updatePassword(
    @Body() password: UpdatePasswordDto,
    @Req() req,
    @Res() res,
  ) {
    const email = req.user.email;
    const user = await this.usersService.findOneByEmail(email);

    const compareOldPassword = await bcrypt.compare(
      password.oldPassword,
      user.password,
    );

    if (!compareOldPassword) {
      Logger.warn('updatePassword:: ' + 'Old password is wrong');
      throw new ForbiddenException('Old password is wrong');
    }

    const newPassword = await this.helpers.hashPassword(password.newPassword);
    await this.usersService.updatePassword(user.id, newPassword);

    return this.helpers.response(res, HttpStatus.OK, 'Password updated');
  }

  @Patch('reset-password')
  @ApiOperation({
    summary: 'Reset user password',
    description: '',
    tags: ['Users'],
  })
  async resetPassword(@Body() users: any, @Res() res) {
    const user = await this.usersService.findOneByEmail(users.email);

    if (!user) {
      Logger.warn('resetPassword:: ' + 'Email is not found');
      throw new ForbiddenException('Email is not found');
    }

    const password = await this.helpers.hashPassword(users.password);
    await this.usersService.updatePassword(user.id, password);

    return this.helpers.response(res, HttpStatus.OK, 'Password has been reset');
  }
}
