import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserInfoRepository } from './userInfo.repository';
import { UserInfoService } from './userInfo.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserInfoRepository])],
  exports: [UserInfoService],
  providers: [UserInfoService],
})
export class UserInfoModule {}
