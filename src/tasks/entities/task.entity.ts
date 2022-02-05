import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import type { Board } from '../../boards/entities/board.entity';
import type { UserEntity as User } from '../../users/entities/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @Column()
  description!: string;

  @Column('uuid', {
    nullable: true,
  })
  columnId!: string | null;

  @Column('uuid', {
    nullable: true,
  })
  userId!: string | null;

  @Column('uuid', {
    nullable: true,
  })
  boardId!: string | null;

  // @ManyToOne('User', 'tasks', {
  //   eager: true,
  //   nullable: true,
  //   onDelete: 'SET NULL',
  //   onUpdate: 'CASCADE',
  // })
  // user!: User;

  @ManyToOne('Board', 'tasks', {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  board!: Board;
}
