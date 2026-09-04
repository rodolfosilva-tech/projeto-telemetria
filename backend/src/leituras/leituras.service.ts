import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeituraEntity } from './leitura.entity';
import { MedidorEntity } from '../medidores/medidor.entity';

export class CreateLeituraDto {
  medidorId: string;
  dataHora?: string | Date;
  valor: number;
}

@Injectable()
export class LeiturasService {
  constructor(
    @InjectRepository(LeituraEntity)
    private leituraRepo: Repository<LeituraEntity>,
    @InjectRepository(MedidorEntity)
    private medidorRepo: Repository<MedidorEntity>,
  ) {}

  async create(data: CreateLeituraDto) {
    const medidor = await this.medidorRepo.findOne({ where: { id: data.medidorId } });
    if (!medidor) {
      throw new NotFoundException(`Medidor com ID ${data.medidorId} não encontrado`);
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
