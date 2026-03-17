import { Entity, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';
import { EventPricing } from './event-pricing.entity';
import { EventQuestion } from './event-question.entity';
import { EventButton } from './event-button.entity';

@Entity({ name: 'events' })
export class Event extends BaseEntity {
  @ApiProperty({ example: 'https://dragonforce.fcporto.pt/image.png' })
  @Column({ type: 'varchar', length: 500 })
  image: string;

  @ApiProperty({ example: 'Super Camp Pascua' })
  @Column({ type: 'varchar', length: 255 })
  title_es: string;

  @ApiProperty({ example: 'Easter Super Camp' })
  @Column({ type: 'varchar', length: 255 })
  title_en: string;

  @ApiProperty({ example: 'Programa intensivo de entrenamiento...' })
  @Column({ type: 'text' })
  description_es: string;

  @ApiProperty({ example: 'Intensive training program...' })
  @Column({ type: 'text' })
  description_en: string;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int', default: 0 })
  order: number;

  @OneToMany(() => EventPricing, (pricing) => pricing.event, { cascade: true, eager: true })
  pricing: EventPricing[];

  @OneToMany(() => EventQuestion, (question) => question.event, { cascade: true, eager: true })
  questions: EventQuestion[];

  @OneToMany(() => EventButton, (button) => button.event, { cascade: true, eager: true })
  buttons: EventButton[];
}
