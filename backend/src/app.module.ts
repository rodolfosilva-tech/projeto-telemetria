import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImoveisModule } from './imoveis/imoveis.module';
import { MedidoresModule } from './medidores/medidores.module';
import { LeiturasModule } from './leituras/leituras.module';
import { ConsumoModule } from './consumo/consumo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImovelEntity } from './imoveis/imovel.entity';
import { MedidorEntity } from './medidores/medidor.entity';
import { LeituraEntity } from './leituras/leitura.entity';

@Module({
  imports: [ImoveisModule, MedidoresModule, LeiturasModule, ConsumoModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'telemetria',
    entities: [ImovelEntity, MedidorEntity, LeituraEntity],
    synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
