import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { RoleType } from '../../common/constants/role-type';
import { FileEntity } from '../files/file.entity';
import { UserInfoEntity } from '../userInfo/userInfo.entity';
import { VehicleEntity } from '../vehicle/vehicle.entity';
import { UserDto } from './dto/UserDto';
import { PasswordTransformer } from './password.transformer';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity<UserDto> {
  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.BIME_GOZAR })
  role: RoleType;

  @Column({ unique: true, type: 'varchar', length: 10, nullable: false })
  phone: string;

  @Column({ nullable: true, transformer: new PasswordTransformer() })
  password?: string;

  @ManyToOne(() => FileEntity, { nullable: true, eager: true })
  avatar?: FileEntity;

  @OneToMany(() => VehicleEntity, (item) => item.insurer)
  vehicles: VehicleEntity[];

  @OneToOne(() => UserInfoEntity, (info) => info.user, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn()
  info?: UserInfoEntity;

  @ManyToOne(() => UserEntity, { nullable: true, cascade: true })
  creator?: UserEntity;

  dtoClass = UserDto;
}
