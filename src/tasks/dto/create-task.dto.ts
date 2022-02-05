import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  // @IsString()
  id: string;

  // @IsString()
  // @IsOptional()
  title: string;

  // @IsNumber()
  order: number;

  // @IsString()
  // @IsOptional()
  description: string;

  // @IsString()
  // @IsOptional()
  userId: string | null;

  // @IsString()
  // @IsOptional()
  boardId: string | null;

  // @IsString()
  // @IsOptional()
  columnId: string | null;
}
