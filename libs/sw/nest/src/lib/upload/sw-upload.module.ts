import { Module } from '@nestjs/common';
import { SwUploadService } from './services/sw-upload.service';

const services = [
  SwUploadService
];

@Module({
  providers: [...services],
  exports: [...services],
})
export class SwUploadModule {}
