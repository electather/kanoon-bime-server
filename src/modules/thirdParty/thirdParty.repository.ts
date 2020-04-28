import { EntityRepository, Repository } from 'typeorm';

import { ThirdPartyEntity } from './thirdParty.entity';

@EntityRepository(ThirdPartyEntity)
export class ThirdPartyRepository extends Repository<ThirdPartyEntity> {}
