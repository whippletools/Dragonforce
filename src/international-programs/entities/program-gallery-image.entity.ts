import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { InternationalProgram } from './international-program.entity';

@Entity({ name: 'program_gallery_images' })
export class ProgramGalleryImage {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'https://dragonforce.fcporto.pt/gallery.jpg' })
  @Column({ type: 'varchar', length: 500 })
  url: string;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int', default: 0 })
  order: number;

  @ManyToOne(() => InternationalProgram, (program) => program.gallery, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'program_id' })
  program: InternationalProgram;
}
