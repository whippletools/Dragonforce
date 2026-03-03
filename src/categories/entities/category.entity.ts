import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

import { Blog } from '../../blog/entities/blog.entity';

@Entity('categories')
export class Category {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'boolean', default: true })
  isactive: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  // 🔥 RELACIÓN: Una categoría tiene muchos blogs
  @OneToMany(() => Blog, (blog) => blog.category)
  blogs: Blog[];
}