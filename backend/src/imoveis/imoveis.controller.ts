import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ImoveisService, CreateImovelDto, UpdateImovelDto } from './imoveis.service';

@Controller('imoveis')
export class ImoveisController {
  constructor(private readonly imoveisService: ImoveisService) {}

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

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateImovelDto) {
    return this.imoveisService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imoveisService.remove(id);
  }
}
