import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { TipoMedidor } from '../medidor.entity';

export class CreateMedidorDto {
    @IsString({ message: 'O identificador deve ser um texto' })
    @IsNotEmpty({ message: 'O identificador (número de série) é obrigatório' })
    identificador: string;

    @IsOptional()
    @IsEnum(TipoMedidor, { message: 'O tipo deve ser AGUA, ENERGIA ou GAS' })
    tipo?: TipoMedidor;

    @IsUUID('all', { message: 'O ID do imóvel deve ser um formato UUID válido' })
    @IsNotEmpty({ message: 'O imovelId é obrigatório' })
    imovelId: string;
}