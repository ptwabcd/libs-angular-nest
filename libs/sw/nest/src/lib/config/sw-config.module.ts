import { Module } from '@nestjs/common';
import { SwConfigService } from './services/sw-config.service';

@Module({
  providers: [
    {
      provide: SwConfigService,
      useValue: new SwConfigService(),
    },
  ],
  exports: [SwConfigService],
})
export class SwConfigModule {}
