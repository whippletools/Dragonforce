import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ name: 'train_champions' })
export class TrainChampion extends BaseEntity {
  @ApiProperty({ example: 'play', enum: ['play', 'train'] })
  @Column({ type: 'varchar', length: 50 })
  type: string;

  @ApiProperty({ example: 'https://example.com/bg.jpg' })
  @Column({ type: 'varchar', length: 500 })
  backgroundImage: string;

  @ApiProperty({ example: 'JUEGA COMO NOSOTROS' })
  @Column({ type: 'varchar', length: 255 })
  title_es: string;

  @ApiProperty({ example: 'PLAY LIKE US' })
  @Column({ type: 'varchar', length: 255 })
  title_en: string;

  @ApiProperty({ example: 'Preinscríbase aquí para la escuela...' })
  @Column({ type: 'text' })
  description_es: string;

  @ApiProperty({ example: 'Pre-register here for the Dragon Force...' })
  @Column({ type: 'text' })
  description_en: string;

  @ApiProperty({ example: 'PREINSCRIPCIÓN' })
  @Column({ type: 'varchar', length: 100 })
  buttonText_es: string;

  @ApiProperty({ example: 'PRE-REGISTRATION' })
  @Column({ type: 'varchar', length: 100 })
  buttonText_en: string;

  @ApiProperty({ example: 'preregistration', enum: ['preregistration', 'application'] })
  @Column({ type: 'varchar', length: 50 })
  formType: string;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int', default: 0 })
  order: number;
}
