import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Event } from './event.entity';

@Entity({ name: 'event_questions' })
export class EventQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '¿Qué edades pueden participar?' })
  @Column({ type: 'text' })
  question_es: string;

  @ApiProperty({ example: 'What ages can participate?' })
  @Column({ type: 'text' })
  question_en: string;

  @ApiProperty({ example: 'El programa está diseñado para niños...' })
  @Column({ type: 'text' })
  answer_es: string;

  @ApiProperty({ example: 'The program is designed for children...' })
  @Column({ type: 'text' })
  answer_en: string;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int', default: 0 })
  order: number;

  @ManyToOne(() => Event, (event) => event.questions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'event_id' })
  event: Event;
}
