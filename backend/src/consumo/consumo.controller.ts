import { Controller, Get, Param, Query } from '@nestjs/common';
import { ConsumoService } from './consumo.service';

@Controller('medidores')
export class ConsumoController {
  constructor(private consumoService: ConsumoService) { }

  @Get(':id/consumo')
  consumo(
    @Param('id') id: string,
    @Query('nivel') nivel: 'ano' | 'mes' | 'dia',
    @Query('ano') ano?: string,
    @Query('mes') mes?: string,
  ) {
    return this.consumoService.calcular(
      id,
      nivel,
      ano ? +ano : undefined,
      mes ? +mes : undefined,
    );
  }
}
