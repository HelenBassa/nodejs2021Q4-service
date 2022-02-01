import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

// import type { Task } from './Task';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;

  // @OneToMany('Task', 'user')
  // tasks!: Task[];
}
