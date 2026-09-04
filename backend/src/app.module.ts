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
  imports: [
    ImoveisModule,
    MedidoresModule,
    LeiturasModule,
    ConsumoModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS ?? '',
      database: process.env.DB_NAME || 'telemetria',
      entities: [ImovelEntity, MedidorEntity, LeituraEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
