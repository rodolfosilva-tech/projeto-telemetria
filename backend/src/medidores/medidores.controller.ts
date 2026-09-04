import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { MedidoresService, CreateMedidorDto, UpdateMedidorDto } from './medidores.service';

@Controller('medidores')
export class MedidoresController {
  constructor(private readonly medidoresService: MedidoresService) {}

  @Post()
  create(@Body() dto: CreateMedidorDto) {
    return this.medidoresService.create(dto);
  }

  @Get()
  findAll(@Query('imovelId') imovelId?: string) {
    return this.medidoresService.findAll(imovelId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medidoresService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMedidorDto) {
    return this.medidoresService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medidoresService.remove(id);
  }
}
