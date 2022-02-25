import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class TaskDto {
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  order: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  userId: string | null;

  @IsString()
  @IsOptional()
  boardId: string | null;

  @IsString()
  @IsOptional()
  columnId: string | null;
}
