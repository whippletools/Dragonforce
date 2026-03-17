import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 100 })
  username: string;

  @Column({ length: 150 })
  displayName: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 255 })
  passwordHash: string;

  @Column({ default: 'editor', length: 50 })
  role: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  sessionToken: string | null;
}