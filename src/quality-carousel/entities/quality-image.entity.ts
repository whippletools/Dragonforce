import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ name: 'quality_images' })
export class QualityImage extends BaseEntity {
  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @Column({ type: 'varchar', length: 500 })
  url: string;

  @ApiProperty({ example: 'Dragon Force Quality - Training Session' })
  @Column({ type: 'varchar', length: 255 })
  alt: string;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int', default: 0 })
  order: number;
}
