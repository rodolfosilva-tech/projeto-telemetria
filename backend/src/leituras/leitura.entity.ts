import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { MedidorEntity } from '../medidores/medidor.entity';

@Entity('leituras')
export class LeituraEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'datetime' })
    dataHora: Date;

    @Column({ type: 'decimal', precision: 12, scale: 3 })
    valor: number; // leitura acumulada do medidor (tipo odômetro)

    @ManyToOne(() => MedidorEntity, (medidor) => medidor.leituras)
    medidor: MedidorEntity;
}