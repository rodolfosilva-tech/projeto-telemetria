import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LeituraEntity } from '../leituras/leitura.entity';
import { Repository } from 'typeorm';

type Nivel = 'ano' | 'mes' | 'dia';

@Injectable()
export class ConsumoService {
    constructor(
        @InjectRepository(LeituraEntity)
        private leituraRepo: Repository<LeituraEntity>,
    ) { }

    async calcular(medidorId: string, nivel: Nivel, ano?: number, mes?: number) {
        const leituras = await this.leituraRepo.find({
            where: { medidor: { id: medidorId } },
            order: { dataHora: 'ASC' },
        });

        //consumo = leitura atual - leitura anterior

        const consumos = leituras.slice(1).map((atual, i) => ({
            dataHora: atual.dataHora,
            consumo: Number(atual.valor) - Number(leituras[i].valor)
        }));

        if (nivel === 'ano') {
            return this.agrupar(consumos, (c) => c.dataHora.getFullYear());
        }

        if (nivel === 'mes' && ano) {
            const doAno = consumos.filter((c) => c.dataHora.getFullYear() === ano);
            return this.agrupar(doAno, (c) => c.dataHora.getMonth() + 1);
        }

        if (nivel === 'dia' && ano && mes) {
            const doMes = consumos.filter((c) => c.dataHora.getFullYear() === ano && c.dataHora.getMonth() + 1 === mes);
            return this.agrupar(doMes, (c) => c.dataHora.getDate());
        }

        return [];
    }

    // Agrupar e somar o consumo por uma chave (ano, mês ou dia)
    // Retorna no formato { name, value } que os gráficos do frontend esperam.

    private agrupar(
        consumos: { dataHora: Date, consumo: number }[],
        chave: (c: { dataHora: Date, consumo: number }) => number,
    ) {
        const mapa = new Map<number, number>();
        for (const c of consumos) {
            const k = chave(c);
            mapa.set(k, (mapa.get(k) || 0) + c.consumo);
        }
        return Array.from(mapa.entries()).map(([name, value]) => ({
            name: String(name),
            value: Number(value.toFixed(3)),
        }));
    }



}
