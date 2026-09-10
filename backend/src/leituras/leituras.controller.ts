import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { LeiturasService } from './leituras.service';
import { CreateLeituraDto } from './dto/create-leitura.dto';

@Controller() // Deixamos vazio para personalizar as rotas abaixo
export class LeiturasController {
  constructor(private readonly leiturasService: LeiturasService) { }

  // --- Rota exigida pelo Onboarding ---
  @Post('medidores/:id/leituras')
  create(@Param('id') medidorId: string, @Body() dto: CreateLeituraDto) {
    // Passamos o ID da URL e o JSON validado para o Service
    return this.leiturasService.create(medidorId, dto);
  }

  @Get('leituras')
  findAll(@Query('medidorId') medidorId?: string) {
    return this.leiturasService.findAll(medidorId);
  }

  @Get('leituras/:id')
  findOne(@Param('id') id: string) {
    return this.leiturasService.findOne(id);
  }

  @Delete('leituras/:id')
  remove(@Param('id') id: string) {
    return this.leiturasService.remove(id);
  }
}