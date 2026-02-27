import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'slider_image' })
export class SliderImage {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bytea', nullable: true })
  image: Buffer;

  // 👇 AHORA NO SON OBLIGATORIOS
  @Column({ type: 'varchar', length: 100, nullable: true })
  title: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  button: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  create_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  update_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  delete_at: Date;
}