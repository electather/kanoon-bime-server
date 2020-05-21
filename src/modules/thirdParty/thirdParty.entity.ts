// eslint-disable-next-line simple-import-sort/sort
import { Column, Entity, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { ThirdPartyDto } from './dto/ThirdPartyDto';
import { InsuranceType } from '../../common/constants/insurance-type';
import { FileEntity } from '../files/file.entity';
import { VehicleEntity } from '../vehicle/vehicle.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'third-party-insurance' })
export class ThirdPartyEntity extends AbstractEntity<ThirdPartyDto> {
  @Column({ nullable: false, unique: true })
  bimeNumber: string;

  @Column({ nullable: false, type: 'timestamp without time zone' })
  startDate: Date;

  @Column({ nullable: false, type: 'timestamp without time zone' })
  endDate: Date;

  @Column({ default: true })
  isCash: boolean;

  @Column({ type: 'int8' })
  fullAmount: number;

  @ManyToOne(() => VehicleEntity, (item) => item.tpi)
  vehicle: VehicleEntity;

  @ManyToOne(() => VehicleEntity)
  insurer: UserEntity;

  @Column({ type: 'enum', enum: InsuranceType, nullable: false })
  insurance: InsuranceType;

  @ManyToOne(() => FileEntity, { nullable: false })
  attachment: FileEntity;

  dtoClass = ThirdPartyDto;
}
