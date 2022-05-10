import { Module } from '@nestjs/common';
import { SwUploadModule } from './upload/sw-upload.module';
import { SwConfigModule } from './config';
import { SwLogModule } from './log';
import { SwResourceModule } from './resource/resource.module';

const modules = [
  SwConfigModule,
  SwResourceModule,
  SwLogModule,
  SwUploadModule
];

@Module({
  imports: [...modules],
  exports: [...modules]
})
export class SwNestModule {}
