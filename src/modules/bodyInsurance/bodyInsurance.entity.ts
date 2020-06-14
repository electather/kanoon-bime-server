import { Column, Entity, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { InsuranceType } from '../../common/constants/insurance-type';
import { FileEntity } from '../files/file.entity';
import { UserEntity } from '../user/user.entity';
import { VehicleEntity } from '../vehicle/vehicle.entity';
import { BodyInsuranceDto } from './dto/BodyInsuranceDto';

@Entity({ name: 'body-insurance' })
export class BodyInsuranceEntity extends AbstractEntity<BodyInsuranceDto> {
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

  @ManyToOne(() => VehicleEntity, (item) => item.bodyInsurance)
  vehicle: VehicleEntity;

  @ManyToOne(() => VehicleEntity, { eager: true })
  insurer: UserEntity;

  @Column({ type: 'enum', enum: InsuranceType, nullable: false })
  insurance: InsuranceType;

  @ManyToOne(() => FileEntity, { nullable: true })
  attachment: FileEntity;

  dtoClass = BodyInsuranceDto;
}
