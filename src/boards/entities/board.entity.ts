import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import type { BoardColumn } from './column.entity';
import type { Task } from '../../tasks/entities/task.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @OneToMany('BoardColumn', 'board', {
    eager: true,
    cascade: true,
  })
  columns!: BoardColumn[];

  // @OneToMany('Task', 'board', {
  //   cascade: true,
  // })
  // tasks!: Task[];
}
