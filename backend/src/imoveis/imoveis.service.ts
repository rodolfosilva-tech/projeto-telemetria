import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImovelEntity } from './imovel.entity';

export class CreateImovelDto {
  nome: string;
  endereco: string;
}

export class UpdateImovelDto {
  nome?: string;
  endereco?: string;
}

@Injectable()
export class ImoveisService {
  constructor(
    @InjectRepository(ImovelEntity)
    private imovelRepo: Repository<ImovelEntity>,
  ) {}

  create(data: CreateImovelDto) {
    const imovel = this.imovelRepo.create(data);
    return this.imovelRepo.save(imovel);
  }

  findAll() {
    return this.imovelRepo.find({ relations: { medidores: true } });
  }

  async findOne(id: string) {
    const imovel = await this.imovelRepo.findOne({
      where: { id },
      relations: { medidores: true },
    });
    if (!imovel) {
      throw new NotFoundException(`Imóvel com ID ${id} não encontrado`);
    }
    return imovel;
  }

  async update(id: string, data: UpdateImovelDto) {
    const imovel = await this.findOne(id);
    Object.assign(imovel, data);
    return this.imovelRepo.save(imovel);
  }

  async remove(id: string) {
    const imovel = await this.findOne(id);
    return this.imovelRepo.remove(imovel);
  }
}
