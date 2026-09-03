import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MedidorEntity } from '../medidores/medidor.entity';

@Entity('imoveis')
export class ImovelEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @Column()
    endereco: string;

    @OneToMany(() => MedidorEntity, (medidor) => medidor.imovel)
    medidores: MedidorEntity[];
}