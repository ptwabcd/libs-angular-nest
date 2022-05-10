import { Module } from '@nestjs/common';
import { SwResourceService } from './services/sw-resource.service';
import { SwLogModule } from '../log/sw-log.module';

@Module({
  imports: [
    SwLogModule
  ],
  providers: [SwResourceService],
  exports: [SwResourceService],
})
export class SwResourceModule {}
