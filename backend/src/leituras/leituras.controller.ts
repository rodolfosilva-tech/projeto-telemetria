import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { LeiturasService, CreateLeituraDto } from './leituras.service';

@Controller('leituras')
export class LeiturasController {
  constructor(private readonly leiturasService: LeiturasService) {}

  @Post()
  create(@Body() dto: CreateLeituraDto) {
    return this.leiturasService.create(dto);
  }

  @Get()
  findAll(@Query('medidorId') medidorId?: string) {
    return this.leiturasService.findAll(medidorId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leiturasService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leiturasService.remove(id);
  }
}
