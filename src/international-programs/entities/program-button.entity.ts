import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { InternationalProgram } from './international-program.entity';

@Entity({ name: 'program_buttons' })
export class ProgramButton {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Inscribirse Ahora' })
  @Column({ type: 'varchar', length: 255 })
  text: string;

  @ApiProperty({ example: '/register/youth-football-tour' })
  @Column({ type: 'varchar', length: 500 })
  action: string;

  @ApiProperty({ example: 'primary', enum: ['primary', 'secondary'] })
  @Column({ type: 'varchar', length: 50 })
  variant: string;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int', default: 0 })
  order: number;

  @ManyToOne(() => InternationalProgram, (program) => program.buttons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'program_id' })
  program: InternationalProgram;
}
