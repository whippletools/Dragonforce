import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Category } from '../../categories/entities/category.entity';

@Entity('blog')
export class Blog {   // 👈 IMPORTANTE que sea export class Blog

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'text' })
  body: string;

  @Column({ type: 'varchar', nullable: true })
  image_featured: string;

  @Column({ type: 'decimal', nullable: true })
  price: number;

  @Column({ type: 'boolean', default: true })
  isactive: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  // 🔥 RELACIÓN
  @ManyToOne(() => Category, (category) => category.blogs)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}