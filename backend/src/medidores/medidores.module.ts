import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedidoresService } from './medidores.service';
import { MedidoresController } from './medidores.controller';
import { MedidorEntity } from './medidor.entity';
import { ImovelEntity } from '../imoveis/imovel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedidorEntity, ImovelEntity])],
  controllers: [MedidoresController],
  providers: [MedidoresService],
  exports: [MedidoresService],
})
export class MedidoresModule {}
