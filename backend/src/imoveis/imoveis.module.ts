import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImoveisService } from './imoveis.service';
import { ImoveisController } from './imoveis.controller';
import { ImovelEntity } from './imovel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImovelEntity])],
  controllers: [ImoveisController],
  providers: [ImoveisService],
  exports: [ImoveisService],
})
export class ImoveisModule {}
