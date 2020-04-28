import { EntityRepository, Repository } from 'typeorm';

import { UserInfoEntity } from './userInfo.entity';

@EntityRepository(UserInfoEntity)
export class UserInfoRepository extends Repository<UserInfoEntity> {}
