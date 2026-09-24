import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioEntity } from './usuario.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepo: Repository<UsuarioEntity>,
        private readonly jwtService: JwtService,
    ) { }

    async register(dto: RegisterDto) {
        const usuarioExistente = await this.usuarioRepo.findOne({ where: { email: dto.email } });
        if (usuarioExistente) {
            throw new ConflictException('E-mail já cadastrado');
        }

        const saltRounds = 10;
        const senhaHash = await bcrypt.hash(dto.senha, saltRounds);

        const novoUsuario = this.usuarioRepo.create({
            nome: dto.nome,
            email: dto.email,
            senha: senhaHash,
        });

        const salvo = await this.usuarioRepo.save(novoUsuario);
        const { senha, ...usuarioSemSenha } = salvo;
        return usuarioSemSenha;
    }

    async login(dto: LoginDto) {
        const usuario = await this.usuarioRepo.findOne({ where: { email: dto.email } });
        if (!usuario) {
            throw new UnauthorizedException('E-mail ou senha incorretos');
        }

        const senhaValida = await bcrypt.compare(dto.senha, usuario.senha);
        if (!senhaValida) {
            throw new UnauthorizedException('E-mail ou senha incorretos');
        }

        const payload = { sub: usuario.id, email: usuario.email, perfil: usuario.perfil };
        const token = this.jwtService.sign(payload);

        return {
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                perfil: usuario.perfil,
            },
        };
    }
}
