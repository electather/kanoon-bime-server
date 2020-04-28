// eslint-disable-next-line simple-import-sort/sort
import { Column, Entity, OneToOne, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UserInfoDto } from './dto/UserInfoDto';
import { UserEntity } from '../user/user.entity';
import { FileEntity } from '../files/file.entity';

@Entity({ name: 'user-info' })
export class UserInfoEntity extends AbstractEntity<UserInfoDto> {
  @OneToOne(() => UserEntity, (user) => user.info, { nullable: false }) // specify inverse side as a second parameter
  user: UserEntity;

  @Column({ unique: true, type: 'varchar', length: 10, nullable: false })
  melliCode: string;

  @Column({ nullable: true })
  address?: string;

  @ManyToOne(() => FileEntity, { nullable: true })
  melliCardScanFront?: FileEntity;

  @ManyToOne(() => FileEntity, { nullable: true })
  melliCardScanBack?: FileEntity;

  @ManyToOne(() => FileEntity, { nullable: true })
  payrollScan?: FileEntity;

  dtoClass = UserInfoDto;
}
