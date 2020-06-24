// eslint-disable-next-line simple-import-sort/sort
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { VehicleDto } from './dto/VehicleDto';
import { UserEntity } from '../user/user.entity';
import { ThirdPartyEntity } from '../thirdParty/thirdParty.entity';
import { FileEntity } from '../files/file.entity';
import { BodyInsuranceEntity } from '../bodyInsurance/bodyInsurance.entity';

@Entity({ name: 'vehicles' })
export class VehicleEntity extends AbstractEntity<VehicleDto> {
  @ManyToOne(() => UserEntity, (user) => user.vehicles, { nullable: true })
  insurer: UserEntity;

  @Column({ nullable: false })
  ownerName: string;

  @Column({ nullable: false })
  ownerLastName: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ unique: true, nullable: false })
  engineNumber: string;

  @Column({ unique: true, nullable: true })
  chassisNumber: string;

  @Column({ nullable: true })
  plateFirstTwoNumbers?: number;

  @Column({ nullable: true })
  plateLetter?: number;

  @Column({ nullable: true })
  plateLastThreeNumbers?: number;

  @Column({ nullable: true })
  plateIRNumber?: number;

  @Column({ nullable: true })
  payroll?: string;

  @OneToMany(() => ThirdPartyEntity, (item) => item.vehicle, { cascade: true })
  tpi?: ThirdPartyEntity[];

  @OneToMany(() => BodyInsuranceEntity, (item) => item.vehicle, {
    cascade: true,
  })
  bodyInsurance?: BodyInsuranceEntity[];

  @ManyToOne(() => FileEntity, { nullable: true })
  attachment: FileEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  creator?: UserEntity;

  @Column({ nullable: true })
  creatorId?: string;

  dtoClass = VehicleDto;
}
