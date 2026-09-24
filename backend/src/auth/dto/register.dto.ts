import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class RegisterDto {
    @IsNotEmpty({ message: 'O nome é obrigatório' })
    nome: string;

    @IsEmail({}, { message: 'Informe um e-mail válido' })
    @IsNotEmpty({ message: 'O e-mail é obrigatório' })
    email: string;

    @IsNotEmpty({ message: 'A senha é obrigatória' })
    @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
    senha: string;
}

