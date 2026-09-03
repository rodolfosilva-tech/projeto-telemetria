import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ImovelEntity } from '../imoveis/imovel.entity';
import { LeituraEntity } from '../leituras/leitura.entity';

export enum TipoMedidor {
    AGUA = 'AGUA',
    ENERGIA = 'ENERGIA',
    GAS = 'GAS',
}

@Entity('medidores')
export class MedidorEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    identificador: string; // número de série do medidor

    @Column({ type: 'enum', enum: TipoMedidor, default: TipoMedidor.AGUA })
    tipo: TipoMedidor;

    @ManyToOne(() => ImovelEntity, (imovel) => imovel.medidores)
    imovel: ImovelEntity

    @OneToMany(() => LeituraEntity, (leitura) => leitura.medidor)
    leituras: LeituraEntity[];
}
