import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedidorEntity, TipoMedidor } from './medidor.entity';
import { ImovelEntity } from '../imoveis/imovel.entity';
import { CreateMedidorDto } from './dto/create-medidor.dto';
import { UpdateMedidorDto } from './dto/update-medidor.dto';

@Injectable()
export class MedidoresService {
  constructor(
    @InjectRepository(MedidorEntity)
    private medidorRepo: Repository<MedidorEntity>,
    @InjectRepository(ImovelEntity)
    private imovelRepo: Repository<ImovelEntity>,
  ) { }

  async create(data: CreateMedidorDto) {
    const imovel = await this.imovelRepo.findOne({ where: { id: data.imovelId } });
    if (!imovel) {
      throw new NotFoundException(`Imóvel com ID ${data.imovelId} não encontrado`);
    }

    const medidor = this.medidorRepo.create({
      identificador: data.identificador,
      tipo: data.tipo || TipoMedidor.AGUA,
      imovel,
    });

    return this.medidorRepo.save(medidor);
  }

  findAll(imovelId?: string) {
    if (imovelId) {
      return this.medidorRepo.find({
        where: { imovel: { id: imovelId } },
        relations: { imovel: true, leituras: true },
      });
    }
    return this.medidorRepo.find({
      relations: { imovel: true, leituras: true },
    });
  }

  async findOne(id: string) {
    const medidor = await this.medidorRepo.findOne({
      where: { id },
      relations: { imovel: true, leituras: true },
    });
    if (!medidor) {
      throw new NotFoundException(`Medidor com ID ${id} não encontrado`);
    }
    return medidor;
  }

  async update(id: string, data: UpdateMedidorDto) {
    const medidor = await this.findOne(id);

    if (data.imovelId) {
      const imovel = await this.imovelRepo.findOne({ where: { id: data.imovelId } });
      if (!imovel) {
        throw new NotFoundException(`Imóvel com ID ${data.imovelId} não encontrado`);
      }
      medidor.imovel = imovel;
    }

    if (data.identificador !== undefined) {
      medidor.identificador = data.identificador;
    }

    if (data.tipo !== undefined) {
      medidor.tipo = data.tipo;
    }

    return this.medidorRepo.save(medidor);
  }

  async remove(id: string) {
    const medidor = await this.findOne(id);
    return this.medidorRepo.remove(medidor);
  }
}
