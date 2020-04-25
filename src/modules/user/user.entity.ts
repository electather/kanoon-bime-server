import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { RoleType } from '../../common/constants/role-type';
import { FileEntity } from '../files/file.entity';
import { VehicleEntity } from '../vehicle/vehicle.entity';
import { UserDto } from './dto/UserDto';
import { PasswordTransformer } from './password.transformer';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity<UserDto> {
  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  role: RoleType;

  @Column({ unique: true, type: 'varchar', length: 10, nullable: false })
  phone: string;

  @Column({ unique: true, type: 'varchar', length: 10, nullable: false })
  melliCode: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true, transformer: new PasswordTransformer() })
  password?: string;

  @ManyToOne(() => FileEntity, { nullable: true })
  avatar?: FileEntity;

  @OneToMany(() => VehicleEntity, (item) => item.issuer)
  vehicles: VehicleEntity[];

  dtoClass = UserDto;
}
