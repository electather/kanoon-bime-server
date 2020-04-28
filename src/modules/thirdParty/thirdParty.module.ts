import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ThirdPartyController } from './thirdParty.controller';
import { ThirdPartyRepository } from './thirdParty.repository';
import { ThirdPartyService } from './thirdParty.service';

@Module({
  imports: [TypeOrmModule.forFeature([ThirdPartyRepository])],
  controllers: [ThirdPartyController],
  exports: [ThirdPartyService],
  providers: [ThirdPartyService],
})
export class ThirdPartyModule {}
