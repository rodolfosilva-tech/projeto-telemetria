import { IsNotEmpty, IsString } from 'class-validator';

export class CreateImovelDto {
    @IsString({ message: 'O nome deve ser um texto' })
    @IsNotEmpty({ message: 'O nome é obrigatório' })
    nome: string;

    @IsString({ message: 'O endereço deve ser um texto' })
    @IsNotEmpty({ message: 'O endereço é obrigatório' })
    endereco: string;
}