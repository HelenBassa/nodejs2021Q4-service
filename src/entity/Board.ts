import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import type { BoardColumn } from './Column';
import type { Task } from './Task';

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

  @OneToMany('Task', 'board', {
    cascade: true,
  })
  tasks!: Task[];
}
