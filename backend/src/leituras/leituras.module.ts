import { Module } from '@nestjs/common';
import { LeiturasService } from './leituras.service';
import { LeiturasController } from './leituras.controller';

@Module({
  providers: [LeiturasService],
  controllers: [LeiturasController]
})
export class LeiturasModule {}
