import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserNotFoundException } from '../../exceptions/user-not-found.exception';
import { ContextService } from '../../providers/context.service';
import { UtilsService } from '../../providers/utils.service';
import { ConfigService } from '../../shared/services/config.service';
import { UserDto } from '../user/dto/UserDto';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { TokenPayloadDto } from './dto/TokenPayloadDto';
import { UserLoginDto } from './dto/UserLoginDto';

@Injectable()
export class AuthService {
  private static _authUserKey = 'user_key';

  constructor(
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService,
    private readonly _userService: UserService,
  ) {}

  async createToken(
    user: UserEntity | UserDto,
    remember: boolean,
  ): Promise<TokenPayloadDto> {
    const expiresIn = remember
      ? this._configService.getNumber('JWT_EXPIRATION_TIME_LONG')
      : this._configService.getNumber('JWT_EXPIRATION_TIME_SHORT');
    return new TokenPayloadDto({
      expiresIn,
      accessToken: await this._jwtService.signAsync(
        { id: user.id },
        { expiresIn },
      ),
    });
  }

  async validateUser(userLoginDto: UserLoginDto): Promise<UserEntity> {
    const user = await this._userService.findOne({
      phone: userLoginDto.phone,
    });
    const isPasswordValid = await UtilsService.validateHash(
      userLoginDto.password,
      user?.password,
    );
    if (!user || !isPasswordValid) {
      throw new UserNotFoundException();
    }
    return user;
  }

  static setAuthUser(user: UserEntity): void {
    ContextService.set(AuthService._authUserKey, user);
  }

  static getAuthUser(): UserEntity {
    return ContextService.get(AuthService._authUserKey);
  }
}
