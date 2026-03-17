import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ name: 'news' })
export class News extends BaseEntity {
  @ApiProperty({ example: 'dragon-force-championship-2024' })
  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @ApiProperty({ example: 'https://images.unsplash.com/photo.jpg' })
  @Column({ type: 'varchar', length: 500 })
  image: string;

  @ApiProperty({ example: '15 Marzo 2024' })
  @Column({ type: 'varchar', length: 100 })
  date: string;

  @ApiProperty({ example: '2024-03-15' })
  @Column({ type: 'varchar', length: 20 })
  dateSort: string;

  @ApiProperty({ example: 'Dragon Force gana el Campeonato Regional 2024' })
  @Column({ type: 'varchar', length: 500 })
  title_es: string;

  @ApiProperty({ example: 'Dragon Force wins Regional Championship 2024' })
  @Column({ type: 'varchar', length: 500 })
  title_en: string;

  @ApiProperty({ example: 'Nuestros equipos juveniles han demostrado...' })
  @Column({ type: 'text' })
  excerpt_es: string;

  @ApiProperty({ example: 'Our youth teams have shown exceptional...' })
  @Column({ type: 'text' })
  excerpt_en: string;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int', default: 0 })
  order: number;
}
