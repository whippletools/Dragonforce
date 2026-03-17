import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ name: 'slider_hero' })
export class SliderHero extends BaseEntity {
  @ApiProperty({ example: 'video', enum: ['image', 'video'] })
  @Column({ type: 'varchar', length: 20 })
  mediaType: string;

  @ApiProperty({ example: 'https://youtu.be/L3374C3OyrY' })
  @Column({ type: 'varchar', length: 500 })
  mediaUrl: string;

  @ApiProperty({ example: 'center', enum: ['left', 'center', 'right'] })
  @Column({ type: 'varchar', length: 20, default: 'center' })
  positionHorizontal: string;

  @ApiProperty({ example: 'center', enum: ['top', 'center', 'bottom'] })
  @Column({ type: 'varchar', length: 20, default: 'center' })
  positionVertical: string;

  @ApiProperty({ example: 'EVENTOS' })
  @Column({ type: 'varchar', length: 255 })
  title_es: string;

  @ApiProperty({ example: 'EVENTS' })
  @Column({ type: 'varchar', length: 255 })
  title_en: string;

  @ApiProperty({ example: 'Entra en un universo donde la Alegría...' })
  @Column({ type: 'text' })
  body_es: string;

  @ApiProperty({ example: 'Enter a universe where Joy trains...' })
  @Column({ type: 'text' })
  body_en: string;

  @ApiProperty({ example: 'VER CATÁLOGO 25/26' })
  @Column({ type: 'varchar', length: 255 })
  buttonText_es: string;

  @ApiProperty({ example: 'VIEW CATALOG 25/26' })
  @Column({ type: 'varchar', length: 255 })
  buttonText_en: string;

  @ApiProperty({ example: '/catalog' })
  @Column({ type: 'varchar', length: 500 })
  buttonAction: string;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int', default: 0 })
  order: number;
}