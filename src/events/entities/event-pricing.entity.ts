import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Event } from './event.entity';

@Entity({ name: 'event_pricing' })
export class EventPricing {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Alumno Dragon Force' })
  @Column({ type: 'varchar', length: 255 })
  category: string;

  @ApiProperty({ example: 149 })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ApiProperty({ example: 'Precio especial para estudiantes Dragon Force' })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => Event, (event) => event.pricing, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'event_id' })
  event: Event;
}
