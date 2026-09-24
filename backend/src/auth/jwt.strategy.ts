import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepo: Repository<UsuarioEntity>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'telemetria_secret_key_123',
        });
    }

    async validate(payload: { sub: string; email: string }) {
        const usuario = await this.usuarioRepo.findOne({ where: { id: payload.sub } });
        if (!usuario) {
            throw new UnauthorizedException('Usuário não encontrado ou não autorizado');
        }
        // Removemos a senha do retorno do contexto
        const { senha, ...result } = usuario;
        return result;
    }
}
