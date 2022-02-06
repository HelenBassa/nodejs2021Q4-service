import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  StreamableFile,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return { filename: file.originalname };
  }

  @Get(':filename')
  getFile(@Param('filename') filename: string): StreamableFile {
    return this.filesService.getFile(filename);
  }
}
