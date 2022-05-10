import { Module } from '@nestjs/common';
import { SwLogService } from './services/sw-log.service';
import { SwConfigModule } from '../config/sw-config.module';

@Module({
  imports: [
    SwConfigModule
  ],
  providers: [SwLogService],
  exports: [SwLogService],
})
export class SwLogModule {}
