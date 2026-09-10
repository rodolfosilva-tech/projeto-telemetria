import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ImoveisService } from './imoveis.service';
import { CreateImovelDto } from './dto/create-imovel.dto';
import { UpdateImovelDto } from './dto/update-imovel.dto';

@Controller('imoveis')
export class ImoveisController {
  constructor(private readonly imoveisService: ImoveisService) { }

  @Post()
  create(@Body() dto: CreateImovelDto) {
    return this.imoveisService.create(dto);
  }

  @Get()
  findAll() {
    return this.imoveisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imoveisService.findOne(id);
  }

  // --- Rota exigida pelo Onboarding ---
  @Get(':id/medidores')
  async findMedidores(@Param('id') id: string) {
    const imovel = await this.imoveisService.findOne(id);
    return imovel.medidores;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateImovelDto) {
    return this.imoveisService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imoveisService.remove(id);
  }
}
