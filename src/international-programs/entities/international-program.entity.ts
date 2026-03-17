import { Entity, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';
import { ProgramGalleryImage } from './program-gallery-image.entity';
import { ProgramButton } from './program-button.entity';

@Entity({ name: 'international_programs' })
export class InternationalProgram extends BaseEntity {
  @ApiProperty({ example: 'https://dragonforce.fcporto.pt/image.png' })
  @Column({ type: 'varchar', length: 500 })
  coverImage: string;

  @ApiProperty({ example: 'YOUTH FOOTBALL TOUR' })
  @Column({ type: 'varchar', length: 255 })
  title_es: string;

  @ApiProperty({ example: 'YOUTH FOOTBALL TOUR' })
  @Column({ type: 'varchar', length: 255 })
  title_en: string;

  @ApiProperty({ example: 'Experiencia internacional única...' })
  @Column({ type: 'text' })
  description_es: string;

  @ApiProperty({ example: 'Unique international experience...' })
  @Column({ type: 'text' })
  description_en: string;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int', default: 0 })
  order: number;

  @OneToMany(() => ProgramGalleryImage, (img: ProgramGalleryImage) => img.program, { cascade: true, eager: true })
  gallery: ProgramGalleryImage[];

  @OneToMany(() => ProgramButton, (btn: ProgramButton) => btn.program, { cascade: true, eager: true })
  buttons: ProgramButton[];
}
