import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PasswordTransformer } from './password.transformer';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'text', unique: true })
  username: string;

  @Column({ type: 'text', transformer: new PasswordTransformer() })
  password: string;

  @CreateDateColumn({})
  createdAt: Date;


}
