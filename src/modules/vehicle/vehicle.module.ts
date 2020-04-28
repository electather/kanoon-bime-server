import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VehicleController } from './vehicle.controller';
import { VehicleRepository } from './vehicle.repository';
import { VehicleService } from './vehicle.service';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleRepository])],
  controllers: [VehicleController],
  exports: [VehicleService],
  providers: [VehicleService],
})
export class VehicleModule {}
