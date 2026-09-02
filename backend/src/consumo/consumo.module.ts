import { Module } from '@nestjs/common';
import { ConsumoService } from './consumo.service';

@Module({
  providers: [ConsumoService]
})
export class ConsumoModule {}
