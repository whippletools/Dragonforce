import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ name: 'schools' })
export class School extends BaseEntity {
  @ApiProperty({ example: 'https://dragonforce.fcporto.pt/image.png' })
  @Column({ type: 'varchar', length: 500 })
  image: string;

  @ApiProperty({ example: 'COLEGIO IBÉRICO DE GAIA' })
  @Column({ type: 'varchar', length: 255 })
  name_es: string;

  @ApiProperty({ example: 'IBERIAN SCHOOL OF GAIA' })
  @Column({ type: 'varchar', length: 255 })
  name_en: string;

  @ApiProperty({ example: '(GAIA)' })
  @Column({ type: 'varchar', length: 100 })
  location: string;

  @ApiProperty({ example: '/pdfs/schools/colegio-iberico-gaia.pdf' })
  @Column({ type: 'varchar', length: 500 })
  pdfUrl: string;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int', default: 0 })
  order: number;
}
