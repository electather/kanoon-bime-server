import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BodyInsuranceController } from './bodyInsurance.controller';
import { BodyInsuranceRepository } from './bodyInsurance.repository';
import { BodyInsuranceService } from './bodyInsurance.service';

@Module({
  imports: [TypeOrmModule.forFeature([BodyInsuranceRepository])],
  controllers: [BodyInsuranceController],
  exports: [BodyInsuranceService],
  providers: [BodyInsuranceService],
})
export class BodyInsuranceModule {}
