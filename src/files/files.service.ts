import { Injectable, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { UPLOAD_DIR } from '../common/constants';

@Injectable()
export class FilesService {
  getFile(filename: string) {
    const file = createReadStream(join(UPLOAD_DIR, filename));
    return new StreamableFile(file);
  }
}
