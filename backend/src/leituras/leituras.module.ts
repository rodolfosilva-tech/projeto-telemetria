import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeiturasService } from './leituras.service';
import { LeiturasController } from './leituras.controller';
import { LeituraEntity } from './leitura.entity';
import { MedidorEntity } from '../medidores/medidor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeituraEntity, MedidorEntity])],
  controllers: [LeiturasController],
  providers: [LeiturasService],
  exports: [LeiturasService],
})
export class LeiturasModule {}
