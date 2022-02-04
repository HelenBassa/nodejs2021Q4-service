import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import type { Board } from './board.entity';

@Entity()
export class BoardColumn {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @ManyToOne('Board', 'columns', {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  board!: Board;
}
