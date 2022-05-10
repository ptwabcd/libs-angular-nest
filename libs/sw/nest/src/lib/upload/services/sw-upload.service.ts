import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { extname, join, resolve } from 'path';
import { SwUploadFile } from '../models/sw-upload-file';
import { SwDate } from 'sw-common';

@Injectable()
export class SwUploadService {

  constructor() {}

  async upload(file: SwUploadFile, filePath: string, oldFilePath = ''): Promise<string> {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve) => {
      if (filePath) {
        fs.readFile(file.path, async (err, data) => {
          const random1 = Math.floor(Math.random() * 1000000);
          const random2 = Math.floor(Math.random() * 1000000);
          const extension = extname(file.originalname);
          const path = `uploads/${filePath}`;
          const fileName = `${new SwDate().getTimestamp()}-${random1}-${random2}${extension}`;
          if (oldFilePath) {
            await this.removeFile(oldFilePath); // 移除舊檔案
          }
          await fs.mkdir(path, {recursive: true}, () => fs.writeFile(`${path}/${fileName}`, data,  () => resolve(`${path}/${fileName}`)));
        });
      } else {
        resolve('');
      }
    });
  }

  async removeFile(oldFilePath = '') {
    const path = join(resolve('uploads'), '../' + oldFilePath);
    if (oldFilePath && fs.existsSync(path)) {
      await fs.unlinkSync(path);
    }
  }
}
