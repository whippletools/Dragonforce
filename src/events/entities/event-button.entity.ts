import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Event } from './event.entity';

@Entity({ name: 'event_buttons' })
export class EventButton {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Inscribirse Ahora' })
  @Column({ type: 'varchar', length: 255 })
  text: string;

  @ApiProperty({ example: '/register/super-camp-pascua' })
  @Column({ type: 'varchar', length: 500 })
  action: string;

  @ApiProperty({ example: 'primary', enum: ['primary', 'secondary'] })
  @Column({ type: 'varchar', length: 50 })
  variant: string;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int', default: 0 })
  order: number;

  @ManyToOne(() => Event, (event) => event.buttons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'event_id' })
  event: Event;
}
