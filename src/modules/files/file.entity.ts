import { Column, Entity, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UserEntity } from '../user/user.entity';
import { FileDto } from './dto/FileDto';

@Entity({ name: 'files' })
export class FileEntity extends AbstractEntity<FileDto> {
  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => UserEntity, {
    nullable: false,
  })
  creator: UserEntity;

  @Column({ nullable: false })
  file: string;

  dtoClass = FileDto;
}
