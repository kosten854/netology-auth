import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';
import { UserEntity } from './modules/user/user.entity';
import { UserService } from './modules/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    public readonly userService: UserService,
  ) {
    super();
  }
  async validate(username: string, password: string): Promise<UserEntity> {
    const user = await this.userService.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
