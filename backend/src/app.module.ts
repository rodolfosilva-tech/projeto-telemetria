import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImoveisModule } from './imoveis/imoveis.module';
import { MedidoresModule } from './medidores/medidores.module';
import { LeiturasModule } from './leituras/leituras.module';
import { ConsumoModule } from './consumo/consumo.module';

@Module({
  imports: [ImoveisModule, MedidoresModule, LeiturasModule, ConsumoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
