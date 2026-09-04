import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumoService } from './consumo.service';
import { ConsumoController } from './consumo.controller';
import { LeituraEntity } from '../leituras/leitura.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeituraEntity])],
  controllers: [ConsumoController],
  providers: [ConsumoService],
})
export class ConsumoModule { }
