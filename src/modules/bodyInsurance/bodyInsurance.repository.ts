import { EntityRepository, Repository } from 'typeorm';

import { BodyInsuranceEntity } from './bodyInsurance.entity';

@EntityRepository(BodyInsuranceEntity)
export class BodyInsuranceRepository extends Repository<BodyInsuranceEntity> {}
