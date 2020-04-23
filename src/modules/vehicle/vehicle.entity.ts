// eslint-disable-next-line simple-import-sort/sort
import { Column, Entity, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { VehicleDto } from './dto/VehicleDto';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'vehicles' })
export class VehicleEntity extends AbstractEntity<VehicleDto> {
  @ManyToOne(() => UserEntity, (user) => user.vehicles, { nullable: true })
  issuer: UserEntity;

  @Column({ nullable: false })
  ownerName: string;

  @Column({ nullable: false })
  ownerLastName: string;

  @Column({ nullable: true })
  address: string;

  @Column({ unique: true, nullable: false })
  engineNumber: string;

  @Column({ unique: true, nullable: false })
  chassisNumber: string;

  @Column({ nullable: true, type: 'varchar', length: 2 })
  plateFirstTwoNumbers: string;

  @Column({ nullable: true, type: 'varchar', length: 1 })
  plateLetter: string;

  @Column({ nullable: true, type: 'varchar', length: 3 })
  plateLastThreeNumbers: string;

  @Column({ nullable: true, type: 'varchar', length: 2 })
  plateIRNumber: string;

  @Column({ nullable: true })
  payroll: string;

  @Column({ nullable: true })
  melliCardFront: string;

  @Column({ nullable: true })
  melliCardBack: string;

  @Column({ nullable: true })
  previousInsurance: string;

  dtoClass = VehicleDto;
}
