import { IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateLeituraDto {
    @IsNumber({}, { message: 'O valor da leitura deve ser numérico' })
    @IsNotEmpty({ message: 'O valor é obrigatório' })
    valor: number;

    @IsOptional()
    @IsDateString({}, { message: 'Data inválida' })
    dataHora?: string;
}