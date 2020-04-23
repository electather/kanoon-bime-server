import { EntityRepository, Repository } from 'typeorm';

import { VehicleEntity } from './vehicle.entity';

@EntityRepository(VehicleEntity)
export class VehicleRepository extends Repository<VehicleEntity> {}
