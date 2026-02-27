import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity({ name: 'slider_hero' })
export class SliderHero {

  @PrimaryGeneratedColumn()
  id: number;

  // BLOB en PostgreSQL = bytea
  @Column({ type: 'bytea', nullable: true })
  video: Buffer;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'varchar', length: 200 })
  description: string;

  @Column({ type: 'varchar', length: 45 })
  button: string;

  // TINYINT → mejor usar boolean
  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'timestamp', nullable: true })
  create_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  update_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  delete_at: Date;
}