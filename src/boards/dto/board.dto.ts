import { IsArray, IsOptional, IsString } from 'class-validator';
import { BoardColumn } from '../entities/column.entity';

export class BoardDto {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsArray()
  @IsOptional()
  columns: BoardColumn[];
}
