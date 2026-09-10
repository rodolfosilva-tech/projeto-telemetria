import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeituraEntity } from './leitura.entity';
import { MedidorEntity } from '../medidores/medidor.entity';
import { CreateLeituraDto } from './dto/create-leitura.dto';

@Injectable()
export class LeiturasService {
  constructor(
    @InjectRepository(LeituraEntity)
    private leituraRepo: Repository<LeituraEntity>,
    @InjectRepository(MedidorEntity)
    private medidorRepo: Repository<MedidorEntity>,
  ) { }

  async create(medidorId: string, data: CreateLeituraDto) {
    const medidor = await this.medidorRepo.findOne({ where: { id: medidorId } });
    if (!medidor) {
      throw new NotFoundException(`Medidor com ID ${medidorId} não encontrado`);
    }

    const leitura = this.leituraRepo.create({
      dataHora: data.dataHora ? new Date(data.dataHora) : new Date(),
      valor: data.valor,
      medidor,
    });

    return this.leituraRepo.save(leitura);
  }

  findAll(medidorId?: string) {
    if (medidorId) {
      return this.leituraRepo.find({
        where: { medidor: { id: medidorId } },
        relations: { medidor: true },
        order: { dataHora: 'ASC' },
      });
    }
    return this.leituraRepo.find({
      relations: { medidor: true },
      order: { dataHora: 'DESC' },
    });
  }

  async findOne(id: string) {
    const leitura = await this.leituraRepo.findOne({
      where: { id },
      relations: { medidor: true },
    });
    if (!leitura) {
      throw new NotFoundException(`Leitura com ID ${id} não encontrada`);
    }
    return leitura;
  }

  async remove(id: string) {
    const leitura = await this.findOne(id);
    return this.leituraRepo.remove(leitura);
  }
}
