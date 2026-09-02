import { Module } from '@nestjs/common';
import { MedidoresService } from './medidores.service';
import { MedidoresController } from './medidores.controller';

@Module({
  providers: [MedidoresService],
  controllers: [MedidoresController]
})
export class MedidoresModule {}
